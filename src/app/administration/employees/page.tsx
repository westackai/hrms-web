"use client"

import { useEffect, useMemo, useState } from "react"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

import { MoreVertical, Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { showAllEmployees } from "@/network/Api"
import Loader from "@/components/ui/loader"

/* ================= TYPES ================= */

type EmployeeRow = {
  id: number
  name: string
  department: string
  designation: string
  doj: string
  branch: string
  status: "Active" | "Inactive"
}

/* ================= COMPONENT ================= */

export default function EmployeesTable() {
  const router = useRouter()

  const [employees, setEmployees] = useState<EmployeeRow[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeRow | null>(null)

  /* ================= FETCH DATA ================= */

  const fetchData = async () => {
    try {
      const res: any = await showAllEmployees()

      const mappedEmployees: EmployeeRow[] = res?.data.map((emp: any) => ({
        id: emp.emp_id,
        name: [emp.first_name, emp.middle_name, emp.last_name]
          .filter(Boolean)
          .join(" "),
        department: emp.department || "N/A",
        designation: emp.designation || "N/A",
        doj: new Date(emp.created_at).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        branch: emp.worklocation || "WESTACK SOLUTIONS LLP",
        status: emp.is_active ? "Active" : "Inactive",
      }))

      setEmployees(mappedEmployees)
    } catch (error) {
      console.error(error)
      toast.error("Failed to load employees")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  /* ================= FILTER ================= */

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [employees, searchTerm])

  /* ================= ACTIONS ================= */

  const goAddEmployee = () =>
    router.push("/administration/employees/add-employee")

  const goEditEmployee = () =>
    router.push("/administration/employees/edit-employee")

  const handleDeactivate = () => {
    if (!selectedEmployee) return

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, status: "Inactive" }
          : emp
      )
    )

    setIsAlertOpen(false)
  }

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
        <Loader />
      </div>
    )
  }

  /* ================= RENDER ================= */

  return (
    <div className="w-full space-y-4 px-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
            <Badge className="bg-blue-100 text-blue-700 border-none">
              {filteredEmployees.length}
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
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
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
      <div className="bg-white border rounded-xl shadow-sm border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-gray-100 h-[56px] bg-blue-100">
                <TableHead className="pl-8">Employees</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Date Of Joining</TableHead>
                <TableHead className="text-center">Branch</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredEmployees.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50/40 h-[76px] border-gray-100"
                >
                  <TableCell>
                    <div className="flex items-center gap-3 pl-2">
                      <Avatar className="h-9 w-9 ring-2 ring-gray-100">
                        <AvatarFallback>
                          {row.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-800">
                          {row.name}
                        </span>
                        <span className="text-gray-500 text-xs">
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

                  <TableCell className="text-gray-500 text-sm text-center">
                    {row.branch}
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      className={`rounded-full px-3 py-1 text-xs font-medium ${row.status === "Active"
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

      {/* CONFIRM DIALOG */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate <b>{selectedEmployee?.name}</b>. You can’t
              undo this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white"
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
