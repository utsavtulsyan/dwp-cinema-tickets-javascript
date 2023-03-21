import TicketService from "../src/pairtest/TicketService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";
import { accountTests } from "./accountTests.js";
import { validTicketTests } from "./validTicketTests.js";
import { invalidTicketTests } from "./invalidTicketTests.js";
const ticketService = new TicketService();
const purchaseTickets = (accountId, tickets) => {
  const ticketTypeRequests = tickets.map(
    (ticket) => new TicketTypeRequest(ticket.type, ticket.count)
  );
  ticketService.purchaseTickets(accountId, ...ticketTypeRequests);
};

const runTests = (testSummary, testData) => {
  console.info(`Running tests for: ${testSummary}`);
  testData.forEach((test, index) => {
    console.info(`Test ${index + 1}: ${JSON.stringify(test)}`);
    try {
      purchaseTickets(test.testData.accountId, test.testData.tickets);
    } catch (e) {
      if (!test.errorExpected || e.message !== test.errorExpected) {
        console.error("TEST FAILURE: ");
        console.error("Expected Message: ", test.errorExpected);
        console.error("Actual Message: ", e.message);
      }
    }
  });
};

runTests("Account variations", accountTests);
runTests("Valid Ticket variations", validTicketTests);
runTests("Invalid Ticket variations", invalidTicketTests);
