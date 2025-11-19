"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface Transaction {
  id: number
  date: string
  amount: number
  mode: string
  status: string
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

  // 👉 RESET visible count every time dialog opens
  const handleDialogChange = (state: boolean) => {
    setOpen(state)
    if (state) {
      setVisibleCount(5)
    }
  }

  const visibleTransactions = transactions.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      {/* Open dialog button */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={triggerClass}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Popup dialog */}
      <DialogContent className="sm:max-w-xl max-h-[85vh] p-0 rounded-2xl overflow-hidden shadow-2xl border border-blue-200">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Transaction History
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-[13px]">
              Showing {visibleTransactions.length} of {transactions.length} transactions
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* NO TRANSACTIONS */}
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No transactions found.
          </div>
        ) : (
          <ScrollArea className="h-[380px] px-6 py-4 bg-white">
            <div className="space-y-4">

              {/* Visible transactions */}
              {visibleTransactions.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
                >
                  {/* top row */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {t.date}
                    </span>

                    <span className="text-base font-semibold text-blue-600 tracking-tight">
                      ₹ {t.amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* bottom row */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 font-medium">
                      {t.mode}
                    </span>

                    <Badge
                      variant="outline"
                      className={`
                        text-[11px] px-2 py-0.5 rounded-full border
                        ${
                          t.status === "SUCCESS"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : t.status === "FAILED"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      `}
                    >
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}

              {/* LOAD MORE BUTTON */}
              {visibleCount < transactions.length && (
                <div className="flex justify-center pt-2 pb-4">
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
        )}

        {/* FOOTER */}
        <div className="p-4 bg-blue-50 text-center text-xs text-blue-700 font-medium border-t border-blue-200">
          End of Transaction History
        </div>
      </DialogContent>
    </Dialog>
  )
}
