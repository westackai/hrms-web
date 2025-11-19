// src/data/transactions.ts

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  mode: string;
  status: string;
}

export const employeeTransactions: Record<number, Transaction[]> = {
  11: [
    { id: 1, date: "01 Oct 2025", amount: 120000, mode: "UPI", status: "Success" },
    { id: 2, date: "01 Sep 2025", amount: 120000, mode: "Bank Transfer", status: "Success" },
    { id: 3, date: "01 Aug 2025", amount: 120000, mode: "Cheque", status: "Pending" },
    { id: 4, date: "01 Jul 2025", amount: 120000, mode: "UPI", status: "Success" },
    { id: 5, date: "01 Jun 2025", amount: 120000, mode: "UPI", status: "Success" },
    { id: 6, date: "01 May 2025", amount: 120000, mode: "UPI", status: "Success" },
  ],

  10: [
    { id: 1, date: "01 Oct 2025", amount: 90000, mode: "Bank Transfer", status: "Success" },
    { id: 2, date: "01 Sep 2025", amount: 90000, mode: "Bank Transfer", status: "Success" },
    { id: 3, date: "01 Aug 2025", amount: 90000, mode: "UPI", status: "Pending" },
    { id: 4, date: "01 Jul 2025", amount: 90000, mode: "UPI", status: "Success" },
  ],

  9: [
    { id: 1, date: "01 Oct 2025", amount: 85000, mode: "UPI", status: "Success" },
    { id: 2, date: "01 Sep 2025", amount: 85000, mode: "UPI", status: "Success" },
    { id: 3, date: "01 Aug 2025", amount: 85000, mode: "Cheque", status: "On Hold" },
  ],

  // add more for other employees if you want…
};
