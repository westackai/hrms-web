"use client"

import { Fragment, useMemo, useState } from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Tooltip,
    TooltipProvider,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { employeeTransactions } from "@/data/transactions"

import {
    Search,
    Plus,
    Eye,
    Download,
    Calendar as CalendarIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import TransactionsPopover from "@/components/salary/TransactionsPopover"



// ---------------------------------------------------------------------

const employees = [
    {
        id: 11,
        name: "Divya Sohani",
        img: "https://randomuser.me/api/portraits/women/65.jpg",
        designation: "AI/Automation Developer",
        doj: "29 Sep 2025",
        salary: 40000,
    },
    {
        id: 10,
        name: "Deepak Mishra",
        img: "https://randomuser.me/api/portraits/men/76.jpg",
        designation: "Full Stack Developer",
        doj: "01 Feb 2024",
        salary: 60000,
    },
    {
        id: 9,
        name: "Rajat Saraswat",
        img: "https://randomuser.me/api/portraits/men/14.jpg",
        designation: "Full Stack Developer",
        doj: "01 Feb 2024",
        salary: 85000,
    },
    {
        id: 8,
        name: "Utkarsh Nagnath Gaikwad",
        img: "https://randomuser.me/api/portraits/men/91.jpg",
        designation: "Frontend Developer",
        doj: "-",
        salary: 75000,
    },
    {
        id: 7,
        name: "Nitin Chouhan",
        img: "https://randomuser.me/api/portraits/men/54.jpg",
        designation: "Backend Developer",
        doj: "10 Sep 2024",
        salary: 80000,
    },
    {
        id: 6,
        name: "Nitin Batham",
        img: "https://randomuser.me/api/portraits/men/33.jpg",
        designation: "Business Development Executive",
        doj: "14 Jul 2025",
        salary: 45000,
    },
    {
        id: 5,
        name: "Mohit Rathore",
        img: "https://randomuser.me/api/portraits/men/19.jpg",
        designation: "Backend Developer",
        doj: "02 Jan 2025",
        salary: 82000,
    },
    {
        id: 4,
        name: "Kanha Choubey",
        img: "https://randomuser.me/api/portraits/women/29.jpg",
        designation: "Frontend Developer",
        doj: "01 Apr 2024",
        salary: 70000,
    },
    {
        id: 2,
        name: "Abhishekh Ojha",
        img: "https://randomuser.me/api/portraits/men/81.jpg",
        designation: "Frontend Developer",
        doj: "01 Jul 2025",
        salary: 50000,
    },
]

// ---------------------------------------------------------------------

export default function SalaryPaymentsTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [showSalaryId, setShowSalaryId] = useState<number | null>(null)
    const [expandedId, setExpandedId] = useState<number | null>(null)

    const [openModalFor, setOpenModalFor] = useState<number | null>(null)
    const [dateRange, setDateRange] = useState<any>({
        from: null,
        to: null,
    })

    const filtered = useMemo(() => {
        return employees.filter((emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    const router = useRouter();

    const handleDownloadSlip = () => {
        router.push("/administration/salary/slip");
    };

    // ---------------------------------------------------------------------

    return (
        <div className="w-full space-y-6 px-4">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Salary Payments</h2>

            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search employee..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* TABLE */}
            <div className="bg-white border rounded-2xl shadow-sm border-gray-200 px-4">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-gray-100">
                                <TableHead>User</TableHead>
                                <TableHead>Date of Joining</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filtered.map((emp) => {
                                const transactions = employeeTransactions[emp.id] || []
                                const showMore = transactions.length > 5

                                return (
                                    <Fragment key={emp.id}>
                                        {/* MAIN ROW */}
                                        <TableRow className="hover:bg-slate-50/40 border-gray-100">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 ring-2 ring-gray-100">
                                                        <AvatarImage src={emp.img} />
                                                        <AvatarFallback>
                                                            {emp.name
                                                                .split(" ")
                                                                .map((n: any) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-sm text-gray-800">
                                                            {emp.name}
                                                        </span>
                                                        <span className="text-gray-500 text-xs">
                                                            {emp.designation}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-gray-600">
                                                {emp.doj}
                                            </TableCell>

                                            {/* SALARY HOVER */}
                                            <TableCell
                                                className="relative group cursor-pointer"
                                                onMouseEnter={() => setShowSalaryId(emp.id)}
                                                onMouseLeave={() => setShowSalaryId(null)}
                                            >
                                                <div className="relative flex items-center min-w-[120px] h-10">
                                                    {/* 1. The Salary Text (Always rendered to hold the space) */}
                                                    <div
                                                        className={cn(
                                                            "flex items-center gap-2 transition-all duration-300",
                                                            showSalaryId === emp.id ? "blur-none opacity-100" : "blur-[6px] opacity-40"
                                                        )}
                                                    >
                                                        <span className="font-semibold text-gray-900 text-base">
                                                            ₹ {emp.salary.toLocaleString("en-IN")}
                                                        </span>
                                                        <span className="text-xs text-gray-400">/mo</span>
                                                    </div>

                                                    {/* 2. The 'View' Overlay (Absolute centered, disappears on hover) */}
                                                    <div
                                                        className={cn(
                                                            "absolute inset-0 flex items-center transition-opacity duration-300",
                                                            showSalaryId === emp.id ? "opacity-0 pointer-events-none" : "opacity-100"
                                                        )}
                                                    >
                                                        <div className="bg-slate-100/50 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-md flex items-center gap-2 shadow-sm">
                                                            <Eye className="w-3.5 h-3.5 text-gray-500" />
                                                            <span className="text-xs font-medium text-gray-600">View</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* ACTIONS */}
                                            <TableCell className="text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    
                                                    {/* VIEW DETAILS POPUP */}
                                                    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <TransactionsPopover
        triggerClass="h-8 w-8 rounded-full text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
        transactions={transactions}
      />
    </TooltipTrigger>
    <TooltipContent>View Details</TooltipContent>
  </Tooltip>
</TooltipProvider>



                                                    {/* DOWNLOAD SLIP */}
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Dialog
                                                                    open={openModalFor === emp.id}
                                                                    onOpenChange={(v) =>
                                                                        setOpenModalFor(v ? emp.id : null)
                                                                    }
                                                                >
                                                                    <DialogTrigger asChild>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8 rounded-full text-red-700 hover:bg-red-100 hover:text-red-800"
                                                                        >
                                                                            <Download className="h-4 w-4" />
                                                                        </Button>
                                                                    </DialogTrigger>

                                                                    {/* MODAL */}
                                                                    <DialogContent className="sm:max-w-md">
                                                                        <DialogHeader>
                                                                            <DialogTitle className="text-lg font-semibold">
                                                                                Download Salary Slip
                                                                            </DialogTitle>
                                                                        </DialogHeader>

                                                                        <div className="space-y-4">
                                                                            <div className="text-gray-700 font-medium">
                                                                                {emp.name} ({emp.designation})
                                                                            </div>

                                                                            {/* DATE RANGE PICKER */}
                                                                            <div className="grid gap-2">
                                                                                <Popover>
                                                                                    <PopoverTrigger asChild>
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            className={cn(
                                                                                                "w-full justify-start text-left font-normal",
                                                                                                !dateRange?.from && "text-gray-400"
                                                                                            )}
                                                                                        >
                                                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                                                            {dateRange?.from ? (
                                                                                                dateRange.to ? (
                                                                                                    <>
                                                                                                        {format(dateRange.from, "dd MMM yyyy")} -{" "}
                                                                                                        {format(dateRange.to, "dd MMM yyyy")}
                                                                                                    </>
                                                                                                ) : (
                                                                                                    format(dateRange.from, "dd MMM yyyy")
                                                                                                )
                                                                                            ) : (
                                                                                                "Pick a date range"
                                                                                            )}
                                                                                        </Button>
                                                                                    </PopoverTrigger>

                                                                                    <PopoverContent className="w-auto p-0 bg-white border-gray-300">
                                                                                        <Calendar
                                                                                            initialFocus
                                                                                            mode="range"
                                                                                            defaultMonth={dateRange?.from}
                                                                                            selected={dateRange}
                                                                                            onSelect={setDateRange}
                                                                                            numberOfMonths={1}
                                                                                        />
                                                                                    </PopoverContent>
                                                                                </Popover>
                                                                            </div>

                                                                        </div>

                                                                        <DialogFooter>
                                                                            <Button
                                                                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                                                                onClick={() => handleDownloadSlip()}
                                                                            >
                                                                                Download Slip
                                                                            </Button>
                                                                        </DialogFooter>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                Download Slip
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                        {/* EXPANDED TRANSACTIONS */}
                                        {expandedId === emp.id && (
                                            <TableRow className="bg-slate-50/40">
                                                <TableCell colSpan={4}>
                                                    <div className="p-4 space-y-3">
                                                        <h4 className="font-medium text-gray-800 text-sm">
                                                            Recent Transactions
                                                        </h4>

                                                        <div className="space-y-2">
                                                            {(showMore
                                                                ? transactions.slice(0, 5)
                                                                : transactions
                                                            ).map((t) => (
                                                                <div
                                                                    key={t.id}
                                                                    className="flex justify-between items-center border border-gray-200 rounded-lg p-3 bg-white"
                                                                >
                                                                    <span className="text-gray-700 text-sm">
                                                                        {t.date}
                                                                    </span>
                                                                    <span className="font-semibold text-gray-800">
                                                                        ₹ {t.amount.toLocaleString("en-IN")}
                                                                    </span>
                                                                    <span className="text-gray-500 text-sm">
                                                                        {t.mode}
                                                                    </span>
                                                                    <Badge className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                                                                        {t.status}
                                                                    </Badge>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {showMore && (
                                                            <Button
                                                                variant="outline"
                                                                className="text-xs border-gray-300"
                                                            >
                                                                View All Transactions
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="p-4 bg-slate-50 text-sm text-gray-600">
                Showing {filtered.length} of {employees.length} payments
            </div>
        </div>
    )
}
