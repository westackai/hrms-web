// src/data/transactions.ts

export interface Transaction {
  id: number;
  date: string;
  salary: number;
  change: number;     // positive = increment, negative = decrement
  note: string;
}

export const employeeTransactions: Record<number, Transaction[]> = {
  11: [
    {
      id: 1,
      date: "01 Oct 2025",
      salary: 120000,
      change: +5000,
      note: "Annual increment applied"
    },
    {
      id: 2,
      date: "01 Sep 2025",
      salary: 115000,
      change: 0,
      note: "Regular payout"
    },
    {
      id: 3,
      date: "01 Aug 2025",
      salary: 115000,
      change: -2000,
      note: "Adjustment for leave"
    },
  ],

  10: [
    {
      id: 1,
      date: "01 Oct 2025",
      salary: 90000,
      change: +3000,
      note: "Performance bonus added"
    },
    {
      id: 2,
      date: "01 Sep 2025",
      salary: 87000,
      change: 0,
      note: "Monthly salary"
    },
  ],

  9: [
    {
      id: 1,
      date: "01 Oct 2025",
      salary: 85000,
      change: +2500,
      note: "Increment due to promotion"
    },
    {
      id: 2,
      date: "01 Sep 2025",
      salary: 82500,
      change: 0,
      note: "Regular payout"
    },
  ],
};
