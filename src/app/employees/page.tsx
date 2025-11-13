"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import Loader from "@/components/ui/loader"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const data = [
  { id: 11, name: "Divya Sohani", img: "https://randomuser.me/api/portraits/women/65.jpg", department: "Software Development / Engineering", designation: "AI/Automation Developer", doj: "29 Sep 2025", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 10, name: "Deepak Mishra", img: "https://randomuser.me/api/portraits/men/76.jpg", department: "Software Development / Engineering", designation: "Full Stack Developer", doj: "01 Feb 2024", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 9, name: "Rajat Saraswat", img: "https://randomuser.me/api/portraits/men/14.jpg", department: "Software Development / Engineering", designation: "Full Stack Developer", doj: "01 Feb 2024", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 8, name: "Utkarsh Nagnath Gaikwad", img: "https://randomuser.me/api/portraits/men/91.jpg", department: "Software Development / Engineering", designation: "Frontend Developer", doj: "-", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 7, name: "Nitin Chouhan", img: "https://randomuser.me/api/portraits/men/54.jpg", department: "Software Development / Engineering", designation: "Backend Developer", doj: "10 Sep 2024", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 6, name: "Nitin Batham", img: "https://randomuser.me/api/portraits/men/33.jpg", department: "Software Development / Engineering", designation: "Business Development Executive", doj: "14 Jul 2025", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 5, name: "Mohit Rathore", img: "https://randomuser.me/api/portraits/men/19.jpg", department: "Software Development / Engineering", designation: "Backend Developer", doj: "02 Jan 2025", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 4, name: "Kanha Choubey", img: "https://randomuser.me/api/portraits/women/29.jpg", department: "Software Development / Engineering", designation: "Frontend Developer", doj: "01 Apr 2024", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
  { id: 2, name: "Abhishekh Ojha", img: "https://randomuser.me/api/portraits/men/81.jpg", department: "Software Development / Engineering", designation: "Frontend Developer", doj: "01 Jul 2025", branch: "WESTACK SOLUTIONS LLP", status: "Active" },
]

export default function EmployeesTable() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [employees, setEmployees] = useState(data)

  const goAddEmployee = () => {
    setLoading(true)
    setTimeout(() => {
      router.push("/employees/add-employee")
    }, 700)
  }

    const goEditEmployee = () => {
    setLoading(true)
    setTimeout(() => {
      router.push("/employees/edit-employee")
    }, 700)
  }

  const handleDeactivate = () => {
    if (!selectedEmployee) return
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, status: "Inactive" } : emp
      )
    )
    setIsAlertOpen(false)
  }

  return (
    <div className="w-full space-y-4 px-4 py-0">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
            <Badge className="bg-blue-100 text-blue-700 border-none">
              {employees.length}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your employee database
          </p>
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={goAddEmployee}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Employee
        </Button>
      </div>

      <div>
        <div className="bg-white border rounded-2xl shadow-sm border-gray-200 px-4">
          <div className="overflow-x-auto">
            <Table className="border-gray-200">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Date Of Joining</TableHead>
                  <TableHead>Master Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {employees.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-slate-50/40 h-[76px] border-gray-100"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-2 ring-gray-100">
                          <AvatarImage src={row.img} />
                          <AvatarFallback>
                            {row.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-gray-800">
                            {row.name}
                          </span>
                          <span className="text-gray-500 text-[12px]">
                            {row.designation}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-gray-500 text-sm">
                      {row.department}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {row.designation}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {row.doj}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {row.branch}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          row.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* <DropdownMenuItem>View Details</DropdownMenuItem> */}
                          <DropdownMenuItem
                          onClick={goEditEmployee}
                          >
                            Edit Employee</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedEmployee(row)
                              setIsAlertOpen(true)
                            }}
                          >
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50/40 flex items-center justify-between text-sm text-muted-foreground border-gray-200">
        <div>
          Showing {employees.length} of {employees.length} employees
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {loading && <Loader />}

      {/* === Deactivate Alert Dialog === */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate <b>{selectedEmployee?.name}</b> from the
              employee list. You can’t undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeactivate}
            >
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
