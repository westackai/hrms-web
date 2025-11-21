"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Mail, Download } from "lucide-react"

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

export default function SalarySlipDialog({
  emp,
  triggerClass = "",
  onDownload,
  onSendEmail,
}: {
  emp: any
  triggerClass?: string
  onDownload: (year: string, months: string[]) => void
  onSendEmail: (year: string, months: string[]) => void
}) {

  const [open, setOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [allSelected, setAllSelected] = useState(false)
  const [monthsOpen, setMonthsOpen] = useState(false)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => String(currentYear - i))

  useEffect(() => {
    setAllSelected(selectedMonths.length === MONTHS.length)
  }, [selectedMonths])

  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    )
  }

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedMonths([])
      setAllSelected(false)
    } else {
      setSelectedMonths([...MONTHS])
      setAllSelected(true)
    }
  }

  const handleDoneMonths = () => {
    setMonthsOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={triggerClass}>
          <Download className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 rounded-2xl overflow-hidden shadow-2xl border border-blue-200">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Download Salary Slip
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="p-6 bg-white">

          <div className="text-gray-800 font-semibold mb-3">
            {emp?.name}{" "}
            <span className="text-gray-600 font-medium">({emp?.designation})</span>
          </div>

          {/* SELECT YEAR */}
          <div className="space-y-2 mb-4">
            <p className="text-sm font-medium text-blue-500">Select Year</p>

            <Select onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full border-blue-200">
                <SelectValue placeholder="Choose Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SELECT MONTHS */}
          <div className="space-y-2 mb-2">
            <p className="text-sm font-medium text-blue-500">Select Months</p>

            <Popover open={monthsOpen} onOpenChange={setMonthsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between border-blue-300 text-blue-500 hover:bg-blue-50">
                  <span>
                    {selectedMonths.length === 0
                      ? "Choose Months"
                      : `${selectedMonths.length} month(s) selected`}
                  </span>
                  <CalendarIcon className="h-4 w-4 opacity-60" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-2 bg-white border rounded-lg shadow border-blue-200">
                <div className="space-y-1 max-h-64 overflow-y-auto pr-1">

                  <div className="flex items-center gap-2 p-1">
                    <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
                    <span className="text-sm font-medium">Select All</span>
                  </div>

                  <hr className="my-1 border-blue-200" />

                  {MONTHS.map((month) => (
                    <div key={month} className="flex items-center gap-2 p-1">
                      <Checkbox
                        checked={selectedMonths.includes(month)}
                        onCheckedChange={() => toggleMonth(month)}
                      />
                      <span className="text-sm">{month}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleDoneMonths}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <DialogFooter className="flex justify-between">

            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={!selectedYear || selectedMonths.length === 0}
              onClick={() => onDownload(selectedYear, selectedMonths)}
            >
              <Download className="h-4 w-4 mr-2" /> Download Slip
            </Button>

            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              disabled={!selectedYear || selectedMonths.length === 0}
              onClick={() => onSendEmail(selectedYear, selectedMonths)}
            >
              <Mail className="h-4 w-4 mr-2" /> Send to Email
            </Button>

          </DialogFooter>
        </div>

      </DialogContent>
    </Dialog>
  )
}
