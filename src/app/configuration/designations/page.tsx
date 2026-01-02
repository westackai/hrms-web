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
  showAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} from "@/network/Api"
import DesignationFormDialog from "@/components/designation/DesignationFormDialog"

/* ---------------- TYPES ---------------- */

type Designation = {
  id: string
  name: string
  emp_count: number
}

/* ---------------- COMPONENT ---------------- */

export default function DesignationsPage() {
  const [designations, setDesignations] = useState<Designation[]>([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [selectedDesignation, setSelectedDesignation] =
    useState<Designation | null>(null)

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  /* ---------------- FETCH ---------------- */

  const fetchDesignations = async () => {
    try {
      setLoading(true)
      const res = await showAllDesignations()

      if (res?.data) {
        setDesignations(
          res.data.map((d: any) => ({
            id: d.id,
            name: d.name,
            emp_count: d.emp_count,
          }))
        )
      }
    } catch {
      toast.error("Failed to fetch designations")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDesignations()
  }, [])

  /* ---------------- CREATE ---------------- */

  const handleCreateDesignation = async (name: string) => {
    try {
      const res = await createDesignation({ name })

      if (res?.data) {
        setDesignations((prev) => [
          ...prev,
          {
            id: res.data.id,
            name: res.data.name,
            emp_count: res.data.emp_count,
          },
        ])
        toast.success("Designation created successfully")
      }
    } catch {
      toast.error("Failed to create designation")
    }
  }

  /* ---------------- UPDATE ---------------- */

  const handleUpdateDesignation = async (name: string) => {
    if (!selectedDesignation) return

    try {
      const res = await updateDesignation(selectedDesignation.id, { name })

      if (res?.data) {
        setDesignations((prev) =>
          prev.map((d) =>
            d.id === selectedDesignation.id
              ? { ...d, name: res.data.name }
              : d
          )
        )
        toast.success("Designation updated successfully")
        setSelectedDesignation(null)
      }
    } catch {
      toast.error("Failed to update designation")
    }
  }

  /* ---------------- DELETE ---------------- */

  const handleDeleteDesignation = async () => {
    if (!selectedDesignation) return

    try {
      await deleteDesignation(selectedDesignation.id)
      setDesignations((prev) =>
        prev.filter((d) => d.id !== selectedDesignation.id)
      )
      toast.success("Designation deleted successfully")
    } catch {
      toast.error("Failed to delete designation")
    } finally {
      setIsDeleteAlertOpen(false)
      setSelectedDesignation(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full space-y-4 p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Designation</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage designation roles and assignments
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setDialogMode("create")
              setSelectedDesignation(null)
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
                  designations.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                    >
                      <TableCell className="px-5 py-4 font-medium text-sm">
                        {item.name}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-center text-sm font-medium">
                        {item.emp_count}
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
                                  setSelectedDesignation(item)
                                  setDialogMode("edit")
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedDesignation(item)
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
      <DesignationFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={selectedDesignation ?? undefined}
        onSubmit={(name) =>
          dialogMode === "create"
            ? handleCreateDesignation(name)
            : handleUpdateDesignation(name)
        }
      />

      {/* DELETE ALERT */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white"
              onClick={handleDeleteDesignation}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
