"use client"

import { useState } from "react"
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

import BranchFormDialog from "@/components/branch/BranchFormDialog"

const defaultBranches = [
  { id: 1, name: "Information Technology", employeeCount: 120 },
  { id: 2, name: "Mechanical Engineering", employeeCount: 90 },
  { id: 3, name: "Civil Engineering", employeeCount: 75 },
]

export default function BranchesPage() {
  const [branches, setBranches] = useState(defaultBranches)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<any>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  const handleCreateBranch = (name: string) => {
    const newBranch = {
      id: branches.length + 1,
      name,
      employeeCount: 0,
    }
    setBranches([...branches, newBranch])
  }

  const handleUpdateBranch = (name: string) => {
    if (!selectedBranch) return
    const updated = branches.map((b) =>
      b.id === selectedBranch.id ? { ...b, name } : b
    )
    setBranches(updated)
  }

  const handleDeleteBranch = () => {
    if (!selectedBranch) return
    setBranches(branches.filter((b) => b.id !== selectedBranch.id))
    setIsDeleteAlertOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Main Content ===== */}
      <div className="flex-grow w-full space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Academic Branches</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage academic branches like IT, Mechanical, Civil, etc.
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
            <Plus className="w-4 h-4 mr-2" /> Add Branch
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-2xl shadow-sm border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-slate-50/40">
                  <th className="px-5 py-4 text-left font-medium text-gray-500 text-sm">
                    Branch Name
                  </th>
                  <th className="px-5 py-4 text-center font-medium text-gray-500 text-sm">
                    Employee Count
                  </th>
                  <th className="px-5 py-4 text-center font-medium text-gray-500 text-sm w-32">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch) => (
                  <tr
                    key={branch.id}
                    className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                  >
                    <td className="px-5 py-4">
                      <span className="font-medium text-sm text-gray-800">
                        {branch.name}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span className="text-sm text-gray-600 font-medium">
                        {branch.employeeCount}
                      </span>
                    </td>

                    <td className="px-5 py-4">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== Sticky Footer ===== */}
      <div className="p-4 bg-slate-50/40 flex items-center justify-between text-sm text-muted-foreground border-t border-gray-200 mt-auto">
        <div>Showing {branches.length} of {branches.length} branches</div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* ===== Dialogs ===== */}
      <BranchFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={selectedBranch}
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
              This action cannot be undone. This will permanently delete this branch.
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
