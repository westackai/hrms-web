"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus, Pencil, Trash2 } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import toast from "react-hot-toast"

import {
  showAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/network/Api"
import DepartmentFormDialog from "@/components/department/DepartmentFormDialog"

/* ---------------- TYPES ---------------- */

type Department = {
  id: string
  name: string
  emp_count: number
}

/* ---------------- COMPONENT ---------------- */

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  const [selectedDept, setSelectedDept] = useState<Department | null>(null)


  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")



  /* ---------------- FETCH ---------------- */

  const fetchDepartments = async () => {
    try {
      setLoading(true)
      const res = await showAllDepartments()

      if (res?.data) {
        setDepartments(
          res.data.map((d: any) => ({
            id: d.id,
            name: d.name,
            emp_count: d.emp_count,
          }))
        )
      }
    } catch {
      toast.error("Failed to fetch departments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  /* ---------------- CREATE ---------------- */

  const handleCreateDepartment = async (name: string) => {
    try {
      const res = await createDepartment({ name })
      if (res) {
        setDepartments((prev) => [
          ...prev,
          {
            id: res.data.id,
            name: res.data.name,
            emp_count: res.data.emp_count,
          },
        ])
        // toast.success(res.message)
      }
    } catch {
      toast.error("Failed to create department")
    }
  }


  /* ---------------- UPDATE ---------------- */

  const handleUpdateDepartment = async (name: string) => {
    if (!selectedDept) return

    try {
      const res = await updateDepartment(selectedDept.id, { name })

      if (res) {
        setDepartments((prev) =>
          prev.map((d) =>
            d.id === selectedDept.id
              ? { ...d, name: res.data.name }
              : d
          )
        )

        toast.success("Department updated successfully")
        setSelectedDept(null)
      }
    } catch {
      toast.error("Failed to update department")
    }
  }

  /* ---------------- DELETE ---------------- */

  const handleDeleteDepartment = async () => {
    if (!selectedDept) return

    try {
      await deleteDepartment(selectedDept.id)
      setDepartments(prev =>
        prev.filter(d => d.id !== selectedDept.id)
      )
      toast.success("Department deleted successfully")
    } catch {
      toast.error("Failed to delete department")
    } finally {
      setIsDeleteAlertOpen(false)
      setSelectedDept(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full space-y-4 p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Department</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your organizational departments
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setDialogMode("create")
              setSelectedDept(null)
              setIsDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-2xl shadow-sm border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-gray-100 bg-blue-100 h-[56px]">
                  <TableHead className="px-5 py-4 text-left text-sm">
                    Name
                  </TableHead>
                  <TableHead className="px-5 py-4 text-center text-sm">
                    Employee Count
                  </TableHead>
                  <TableHead className="px-5 py-4 text-center text-sm w-32">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="h-[68px]">
                      <TableCell className="px-5 py-4">
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center">
                        <div className="h-4 w-10 bg-gray-200 rounded mx-auto animate-pulse" />
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center">
                        <div className="h-8 w-8 bg-gray-200 rounded mx-auto animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  departments.map(dept => (
                    <TableRow
                      key={dept.id}
                      className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                    >
                      <TableCell className="px-5 py-4 font-medium text-sm">
                        {dept.name}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-center text-sm font-medium">
                        {dept.emp_count}
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <div className="flex items-center justify-center">
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
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedDept(dept)
                                  setDialogMode("edit")
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedDept(dept)
                                  setIsDeleteAlertOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <DepartmentFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={selectedDept ?? undefined}
        onSubmit={(name) =>
          dialogMode === "create"
            ? handleCreateDepartment(name)
            : handleUpdateDepartment(name)
        }
      />

      {/* DELETE */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white"
              onClick={handleDeleteDepartment}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
