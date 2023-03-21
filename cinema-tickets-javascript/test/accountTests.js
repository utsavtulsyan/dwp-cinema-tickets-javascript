export const accountTests = [
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
      accountId: 0,
      tickets: [
        {
          type: "ADULT",
          count: 1,
        },
      ],
    },
    errorExpected: "Invalid account provided",
  },
  {
    testData: {
      accountId: -1,
      tickets: [
        {
          type: "ADULT",
          count: 1,
        },
      ],
    },
    errorExpected: "Invalid account provided",
  },
  {
    testData: {
      accountId: "abc",
      tickets: [
        {
          type: "ADULT",
          count: 1,
        },
      ],
    },
    errorExpected: "Invalid account provided",
  },
];
