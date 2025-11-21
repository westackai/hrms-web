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
import SalaryUpdate from "@/components/salary/SalaryUpdate";

import {
    Search,
    Plus,
    Eye,
    Download,
    Calendar as CalendarIcon,
    Pencil,
} from "lucide-react"
import { useRouter } from "next/navigation"
import TransactionsPopover from "@/components/salary/TransactionsPopover"
import SalarySlipDialog from "@/components/salary/SalarySlipDialog"



// ---------------------------------------------------------------------

const employees = [
    {
        id: 11,
        name: "Divya Sohani",
        img: "https://randomuser.me/api/portraits/women/65.jpg",
        designation: "AI/Automation Developer",
        doj: "29 Sep 2025",
        salary: 40000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 10,
        name: "Deepak Mishra",
        img: "https://randomuser.me/api/portraits/men/76.jpg",
        designation: "Full Stack Developer",
        doj: "01 Feb 2024",
        salary: 60000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 9,
        name: "Rajat Saraswat",
        img: "https://randomuser.me/api/portraits/men/14.jpg",
        designation: "Full Stack Developer",
        doj: "01 Feb 2024",
        salary: 85000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 8,
        name: "Utkarsh Nagnath Gaikwad",
        img: "https://randomuser.me/api/portraits/men/91.jpg",
        designation: "Frontend Developer",
        doj: "-",
        salary: 75000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 7,
        name: "Nitin Chouhan",
        img: "https://randomuser.me/api/portraits/men/54.jpg",
        designation: "Backend Developer",
        doj: "10 Sep 2024",
        salary: 80000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 6,
        name: "Nitin Batham",
        img: "https://randomuser.me/api/portraits/men/33.jpg",
        designation: "Business Development Executive",
        doj: "14 Jul 2025",
        salary: 45000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 5,
        name: "Mohit Rathore",
        img: "https://randomuser.me/api/portraits/men/19.jpg",
        designation: "Backend Developer",
        doj: "02 Jan 2025",
        salary: 82000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 4,
        name: "Kanha Choubey",
        img: "https://randomuser.me/api/portraits/women/29.jpg",
        designation: "Frontend Developer",
        doj: "01 Apr 2024",
        salary: 70000,
        lastIncrement: "15 Oct 2025",
    },
    {
        id: 2,
        name: "Abhishekh Ojha",
        img: "https://randomuser.me/api/portraits/men/81.jpg",
        designation: "Frontend Developer",
        doj: "01 Jul 2025",
        salary: 50000,
        lastIncrement: "15 Oct 2025",
    },
]

// ---------------------------------------------------------------------

export default function SalaryPaymentsTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [showSalaryId, setShowSalaryId] = useState<number | null>(null)
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [openSalaryDialog, setOpenSalaryDialog] = useState(false);


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

    const handleDownloadSlip = (year: string, months: string[]) => {
        console.log("DOWNLOAD SLIP →", year, months);
        router.push("/administration/salary/slip");
    };

    const handleSendSlipEmail = (year: string, months: string[]) => {
        console.log("SEND TO EMAIL →", year, months);
        alert(`Salary slip for ${months.join(", ")} ${year} has been sent to email.`);
    };

    // ---------------------------------------------------------------------

    return (
        <div className="w-full space-y-6 px-4">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Salary Management</h2>

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
            <div className="bg-white border rounded-2xl shadow-sm border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className=" ">
                            <TableRow className="border-b border-gray-100 h-[56px] bg-blue-100">
                                <TableHead className="text-center w-20">ID</TableHead>
                                <TableHead>Employees</TableHead>
                                <TableHead>Date of Joining</TableHead>
                                <TableHead className="text-center">Increment Date</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>


                        <TableBody>
                            {filtered.map((emp) => {
                                const transactions = employeeTransactions[emp.id] || []
                                const showMore = transactions.length > 5

                                return (
                                    <Fragment key={emp.id}>
                                        {/* MAIN ROW */}
                                        <TableRow className="hover:bg-slate-50/40 h-[76px] border-gray-100">
                                            <TableCell className="text-center font-semibold text-gray-700">
                                                {emp.id}
                                            </TableCell>
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


                                            <TableCell className="text-gray-600 text-center">
                                                {emp.lastIncrement}
                                            </TableCell>

                                            {/* ACTIONS */}
                                            <TableCell className="text-center">
                                                <div className="flex justify-center items-center gap-2">

                                                    {/* EDIT BUTTON */}
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                                    onClick={() => setOpenSalaryDialog(true)}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>

                                                            </TooltipTrigger>
                                                            <TooltipContent>Update</TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    {/* VIEW DETAILS POPUP */}
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <TransactionsPopover
                                                                    triggerClass="h-8 w-8 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-700"
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

                                                                <SalarySlipDialog
                                                                    emp={emp}
                                                                    triggerClass="h-8 w-8 rounded-full text-red-700 hover:bg-red-100 hover:text-red-800"
                                                                    onDownload={(year, months) => handleDownloadSlip(year, months)}
                                                                    onSendEmail={(year, months) => handleSendSlipEmail(year, months)}
                                                                />

                                                            </TooltipTrigger>
                                                            <TooltipContent>Download Slip</TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                </div>
                                            </TableCell>
                                        </TableRow>


                                    </Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>

                    <SalaryUpdate
                        open={openSalaryDialog}
                        onOpenChange={setOpenSalaryDialog}
                    />

                </div>
            </div>

            <div className="p-4 bg-slate-50 text-sm text-gray-600">
                Showing {filtered.length} of {employees.length} payments
            </div>
        </div>
    )
}
