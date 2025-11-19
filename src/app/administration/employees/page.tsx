"use client"

import { useState, useMemo } from "react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

import { MoreVertical, Plus, Search, ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"

// your same data...
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

  const [employees, setEmployees] = useState(data)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  const goAddEmployee = () => router.push("/administration/employees/add-employee")
  const goEditEmployee = () => router.push("/administration/employees/edit-employee")

  const handleDeactivate = () => {
    if (!selectedEmployee) return
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, status: "Inactive" } : emp
      )
    )
    setIsAlertOpen(false)
  }

  // Search + Filter + Sort Logic
  const filteredEmployees = useMemo(() => {
    let list = [...employees]

    // search
    list = list.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // filter
    if (statusFilter !== "all") {
      list = list.filter((emp) => emp.status === statusFilter)
    }

    // sort
    list.sort((a, b) => {
      if (sortField === "name") return a.name.localeCompare(b.name)
      if (sortField === "department") return a.department.localeCompare(b.department)
      if (sortField === "doj") return new Date(a.doj).getTime() - new Date(b.doj).getTime()
      return 0
    })

    return list
  }, [employees, searchTerm, statusFilter, sortField])

  return (
    <div className="w-full space-y-4 px-4">

      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
            <Badge className="bg-blue-100 text-blue-700 border-none">
              {filteredEmployees.length}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your employee database
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={goAddEmployee}>
          <Plus className="w-4 h-4 mr-2" /> Add Employee
        </Button>
      </div>

      {/* Search + Filter + Sort Bar */}
      <div className="flex flex-wrap gap-3 p-4">

        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search employee..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button  className="flex gap-2 p-5 border border-gray-300">
              <ArrowUpDown className="h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortField("name")}>Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortField("department")}>Department</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortField("doj")}>Date of Joining</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl shadow-sm border-gray-200 px-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Date Of Joining</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredEmployees.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50/40 h-[76px] border-gray-100">

                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 ring-2 ring-gray-100">
                        <AvatarImage src={row.img} />
                        <AvatarFallback>
                          {row.name.split(" ").map((n: any) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-800">{row.name}</span>
                        <span className="text-gray-500 text-xs">{row.designation}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-500 text-sm">{row.department}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{row.designation}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{row.doj}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{row.branch}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className={`rounded-full px-3 py-1 text-xs font-medium ${row.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                        }`}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={goEditEmployee}>
                          Edit Employee
                        </DropdownMenuItem>
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

      {/* FOOTER */}
      <div className="p-4 bg-slate-50/40 flex items-center justify-between text-sm text-muted-foreground">
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>

      {/* DELETE CONFIRM */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate <b>{selectedEmployee?.name}</b>. You can't undo this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 text-white" onClick={handleDeactivate}>
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
