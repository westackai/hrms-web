"use client"

import { useState, useMemo } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Transaction {
  id: number
  date: string
  salary: number
  change: number // + increment, - decrement
  note: string
}

interface TransactionsDialogProps {
  triggerClass?: string
  transactions: Transaction[]
}

export default function TransactionsDialog({
  triggerClass = "",
  transactions,
}: TransactionsDialogProps) {
  const [visibleCount, setVisibleCount] = useState(5)
  const [open, setOpen] = useState(false)

  // 👉 Sort newest salary entry at top
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [transactions])

  const visibleTransactions = sortedTransactions.slice(0, visibleCount)

  const handleDialogChange = (state: boolean) => {
    setOpen(state)
    if (state) setVisibleCount(5)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={triggerClass}>
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[85vh] p-0 rounded-2xl overflow-hidden shadow-2xl border border-blue-200">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Salary History
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-[13px]">
              Showing {visibleTransactions.length} of {transactions.length} records
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* TABLE SECTION */}
        <ScrollArea className="h-auto bg-white">
          <div className="p-6">

            {transactions.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-10">
                No salary history found.
              </div>
            ) : (
              <Table className="border rounded-lg overflow-hidden shadow-sm">
                <TableHeader>
                  <TableRow className="bg-blue-50 border-gray-300">
                    <TableHead className="text-blue-500 font-semibold">Date</TableHead>
                    <TableHead className="text-blue-500 font-semibold">Salary (₹)</TableHead>
                    <TableHead className="text-blue-500 font-semibold text-center">Change</TableHead>
                    <TableHead className="text-blue-500 font-semibold text-center">Note</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {visibleTransactions.map((t) => (
                    <TableRow key={t.id} className="hover:bg-blue-50/40 transition">
                      <TableCell className="font-medium text-gray-700">{t.date}</TableCell>

                      <TableCell className="text-gray-800 font-semibold">
                        ₹ {t.salary.toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell
                        className={`font-semibold text-center ${
                          t.change > 0
                            ? "text-green-600"
                            : t.change < 0
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {t.change > 0 && "+"}
                        {t.change.toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell className="text-gray-600 text-sm text-center">
                        {t.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            )}

            {/* LOAD MORE BUTTON */}
            {visibleCount < transactions.length && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  className="text-sm border-blue-300 text-blue-600 hover:bg-blue-50"
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* FOOTER */}
        <div className="p-4 bg-blue-50 text-center text-xs text-blue-500 font-medium border-t border-blue-200">
          End of Salary History
        </div>
      </DialogContent>
    </Dialog>
  )
}
