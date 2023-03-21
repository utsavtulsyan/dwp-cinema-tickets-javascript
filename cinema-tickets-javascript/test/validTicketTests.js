export const validTicketTests = [
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULT",
          count: 1,
        },
      ],
    },
  },
  {
    testData: {
      accountId: 1,
      tickets: [
        {
          type: "ADULT",
          count: 20,
        },
      ],
    },
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
          type: "INFANT",
          count: 10,
        },
      ],
    },
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
          type: "CHILD",
          count: 5,
        },
        {
          type: "INFANT",
          count: 5,
        },
      ],
    },
  },
];
