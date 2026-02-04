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
import toast from "react-hot-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import BranchFormDialog from "@/components/branch/BranchFormDialog"
import {
  showAllBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from "@/network/Api"

/* ---------------- TYPES ---------------- */

type Branch = {
  id: string;
  name: string;
  emp_count: number;
}

/* ---------------- COMPONENT ---------------- */

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  /* ---------------- FETCH ---------------- */

  const fetchBranches = async () => {
    try {
      setLoading(true)
      const res = await showAllBranches()
      if (res?.data) {
        setBranches(
          res.data.map((b: any) => ({
            id: b.id,
            name: b.name,
            emp_count: b.emp_count,
          }))
        )
      }
    } catch {
      toast.error("Failed to fetch branches")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  /* ---------------- CREATE ---------------- */

  const handleCreateBranch = async (name: string) => {
    try {
      const res = await createBranch({ name })
      if (res) {
        setBranches((prev) => [
          ...prev,
          {
            id: res.data.id,
            name: res.data.name,
            emp_count: res.data.emp_count,

          },
        ])
        toast.success("Branch created successfully")
      }
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to create branch")
    }
  }

  /* ---------------- UPDATE ---------------- */

  const handleUpdateBranch = async (name: string) => {
    if (!selectedBranch) return
    try {
      const res = await updateBranch(selectedBranch.id, { name })
      if (res) {
        setBranches((prev) =>
          prev.map((b) =>
            b.id === selectedBranch.id ? { ...b, name: res.data.name } : b
          )
        )
        toast.success("Branch updated successfully")
        console.log(res);
      }
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to update branch")
    }
  }

  /* ---------------- DELETE ---------------- */

  const handleDeleteBranch = async () => {
    if (!selectedBranch) return
    try {
      const res = await deleteBranch(selectedBranch.id)
      if (res?.data) {
        setBranches((prev) =>
          prev.filter((b) => b.id !== selectedBranch.id)
        )
        toast.success("Branch deleted successfully")
      }
    } catch (error: any) {
      toast.error(error?.data?.detail || "Failed to delete branch")
    } finally {
      setIsDeleteAlertOpen(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Branch</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your organization’s branches.
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setDialogMode("create")
              setSelectedBranch(null)
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
                <TableRow className="border-b border-gray-100 h-[56px] bg-blue-100">
                  <TableHead className="px-5 py-4 text-left font-medium  text-sm">
                    Name
                  </TableHead>
                  <TableHead className="px-5 py-4 text-center font-medium text-sm">
                    Employee Count
                  </TableHead>
                  <TableHead className="px-5 py-4 text-center font-medium text-sm w-32">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
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
                  : branches.map((branch) => (
                    <TableRow
                      key={branch.id}
                      className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                    >
                      <TableCell className="px-5 py-4 font-medium text-sm text-gray-800">
                        {branch.name}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-center text-sm font-medium text-gray-600">
                        {branch.emp_count}
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <div className="flex items-center justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-40 bg-white border border-gray-200 shadow-lg rounded-xl p-1"
                            >
                              <DropdownMenuItem
                                className="cursor-pointer rounded-md px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                                onClick={() => {
                                  setSelectedBranch(branch)
                                  setDialogMode("edit")
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="cursor-pointer rounded-md px-3 py-2 hover:bg-red-50 hover:text-red-600"
                                onClick={() => {
                                  setSelectedBranch(branch)
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
                  ))}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>

      {/* Dialogs */}
      <BranchFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={selectedBranch ?? undefined}
        onSubmit={(name) =>
          dialogMode === "create"
            ? handleCreateBranch(name)
            : handleUpdateBranch(name)
        }
      />

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
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteBranch}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
