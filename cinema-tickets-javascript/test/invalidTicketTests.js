export const invalidTicketTests = [
  {
    testData: {
      accountId: 1,
      tickets: [],
    },
    errorExpected: "No tickets being booked",
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULT",
          count: 0,
        },
      ],
    },
    errorExpected: "No tickets being booked",
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULT",
          count: -1,
        },
      ],
    },
    errorExpected: "Invalid ticket count provided",
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULT",
          count: 21,
        },
      ],
    },
    errorExpected: "Maximum 20 tickets can be booked at a time",
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "INFANT",
          count: 1,
        },
      ],
    },
    errorExpected: "No adult tickets being booked",
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULT",
          count: 10,
        },
        {
          type: "ADULT",
          count: 11,
        },
      ],
    },
    errorExpected: "Maximum 20 tickets can be booked at a time",
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULTS",
          count: 10,
        },
      ],
    },
    errorExpected: "type must be ADULT, CHILD, or INFANT",
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULT",
          count: "a",
        },
      ],
    },
    errorExpected: "noOfTickets must be an integer",
  },
];
