"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
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
  showAllEmploymentTypes,
  createEmploymentType,
  updateEmploymentType,
  deleteEmploymentType,
} from "@/network/Api"
import EmploymentTypeFormDialog from "@/components/employment/EmploymentTypeFormDialog"

/* ---------------- TYPES ---------------- */

type EmploymentType = {
  id: string
  name: string
  emp_count: number
}

/* ---------------- COMPONENT ---------------- */

export default function EmploymentTypesPage() {
  const [types, setTypes] = useState<EmploymentType[]>([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [selectedType, setSelectedType] =
    useState<EmploymentType | null>(null)

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  /* ---------------- FETCH ---------------- */

  const fetchEmploymentTypes = async () => {
    try {
      setLoading(true)
      const res = await showAllEmploymentTypes()

      if (res?.data) {
        setTypes(
          res.data.map((t: any) => ({
            id: t.id,
            name: t.name,
            emp_count: t.emp_count,
          }))
        )
      }
    } catch {
      toast.error("Failed to fetch employment types")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmploymentTypes()
  }, [])

  /* ---------------- CREATE ---------------- */

  const handleCreateType = async (name: string) => {
    try {
      const res = await createEmploymentType({ name })

      if (res?.data) {
        setTypes((prev) => [
          ...prev,
          {
            id: res.data.id,
            name: res.data.name,
            emp_count: res.data.emp_count,
          },
        ])
        toast.success("Employment type created successfully")
      }
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to create employment type")
    }
  }

  /* ---------------- UPDATE ---------------- */

  const handleUpdateType = async (name: string) => {
    if (!selectedType) return

    try {
      const res = await updateEmploymentType(selectedType.id, { name })

      if (res?.data) {
        setTypes((prev) =>
          prev.map((t) =>
            t.id === selectedType.id
              ? { ...t, name: res.data.name }
              : t
          )
        )
        toast.success("Employment type updated successfully")
        setSelectedType(null)
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error?.data?.detail || "Failed to update employment type")
    }
  }

  /* ---------------- DELETE ---------------- */

  const handleDeleteType = async () => {
    if (!selectedType) return

    try {
      await deleteEmploymentType(selectedType.id)
      setTypes((prev) =>
        prev.filter((t) => t.id !== selectedType.id)
      )
      toast.success("Employment type deleted successfully")
    } catch {
      toast.error("Failed to delete employment type")
    } finally {
      setIsDeleteAlertOpen(false)
      setSelectedType(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full space-y-4 p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Employment Type
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage employment types like Full-Time, Part-Time, and Intern.
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setDialogMode("create")
              setSelectedType(null)
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
                    Employment Type
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
                  types.map((type) => (
                    <TableRow
                      key={type.id}
                      className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                    >
                      <TableCell className="px-5 py-4 font-medium text-sm">
                        {type.name}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-center text-sm font-medium">
                        {type.emp_count}
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
                                className="cursor-pointer rounded-md px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                                onClick={() => {
                                  setSelectedType(type)
                                  setDialogMode("edit")
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="cursor-pointer rounded-md px-3 py-2 hover:bg-red-50 hover:text-red-600"
                                onClick={() => {
                                  setSelectedType(type)
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

      {/* FORM DIALOG */}
      <EmploymentTypeFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={selectedType ?? undefined}
        onSubmit={(name) =>
          dialogMode === "create"
            ? handleCreateType(name)
            : handleUpdateType(name)
        }
      />

      {/* DELETE ALERT */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this employment type.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white"
              onClick={handleDeleteType}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
