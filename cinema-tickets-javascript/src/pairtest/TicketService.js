import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #TicketPrice = {
    Adult: 20,
    Child: 10,
    Infant: 0,
  };
  #AdultType = "ADULT";
  #ChildType = "CHILD";
  #InfantType = "INFANT";

  #seatReservationService;
  #ticketPaymentService;

  #validateAccount(accountId) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException("Invalid account provided");
    }
  }

  #validateTicket(noOfTickets) {
    if (!Number.isInteger(noOfTickets) || noOfTickets < 0) {
      throw new InvalidPurchaseException("Invalid ticket count provided");
    }
  }

  #validateConsolidatedTickets({ adultTickets, childTickets, infantTickets }) {
    if (adultTickets + childTickets + infantTickets === 0) {
      throw new InvalidPurchaseException("No tickets being booked");
    }
    if (adultTickets === 0) {
      throw new InvalidPurchaseException("No adult tickets being booked");
    }
    if (adultTickets + childTickets + infantTickets > 20) {
      throw new InvalidPurchaseException(
        "Maximum 20 tickets can be booked at a time"
      );
    }
    // since one infant can sit on one adults lap, can there be more infants than adults?
    // if(infantTickets > adultTickets){
    //   throw new InvalidPurchaseException("Adult tickets cannot be less than infant tickets")
    // }
  }

  #getConsolidatedTickets(ticketTypeRequests) {
    let adultTickets = 0;
    let childTickets = 0;
    let infantTickets = 0;
    ticketTypeRequests.forEach((ticketTypeRequest) => {
      const ticketType = ticketTypeRequest.getTicketType();
      const noOfTickets = ticketTypeRequest.getNoOfTickets();
      this.#validateTicket(noOfTickets);
      switch (ticketType) {
        case this.#AdultType:
          adultTickets = adultTickets + noOfTickets;
          break;
        case this.#ChildType:
          childTickets = childTickets + noOfTickets;
          break;
        case this.#InfantType:
          infantTickets = infantTickets + noOfTickets;
          break;
        default:
          throw new InvalidPurchaseException("Invalid ticket type provided");
      }
    });
    return { adultTickets, childTickets, infantTickets };
  }

  #calcNoOfSeats(consolidatedTickets) {
    return consolidatedTickets.adultTickets + consolidatedTickets.childTickets;
  }

  #reserveSeats(accountId, noOfSeats) {
    try {
      if (!this.#seatReservationService) {
        this.#seatReservationService = new SeatReservationService();
      }
      this.#seatReservationService.reserveSeat(accountId, noOfSeats);
    } catch (e) {
      throw new InvalidPurchaseException("Unable to reserve seat");
    }
  }

  #calcAmountToPay(consolidatedTickets) {
    const adultsCost =
      consolidatedTickets.adultTickets * this.#TicketPrice.Adult;
    const childrenCost =
      consolidatedTickets.childTickets * this.#TicketPrice.Child;
    return adultsCost + childrenCost;
  }

  #payForTickets(accountId, totalAmountToPay) {
    try {
      if (!this.#ticketPaymentService) {
        this.#ticketPaymentService = new TicketPaymentService();
      }
      this.#ticketPaymentService.makePayment(accountId, totalAmountToPay);
    } catch (e) {
      throw new InvalidPurchaseException("Unable to pay for ticket");
    }
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException

    this.#validateAccount(accountId);
    const consolidatedTickets =
      this.#getConsolidatedTickets(ticketTypeRequests);
    this.#validateConsolidatedTickets(consolidatedTickets);
    this.#reserveSeats(accountId, this.#calcNoOfSeats(consolidatedTickets));
    this.#payForTickets(accountId, this.#calcAmountToPay(consolidatedTickets));
  }
}
