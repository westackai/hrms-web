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

import ShiftFormDialog from "@/components/shift/ShiftFormDialog"

const defaultShifts = [
  { id: 1, name: "Morning Shift", startTime: "10:00", endTime: "19:00" },
  
]

export default function ShiftsPage() {
  const [shifts, setShifts] = useState(defaultShifts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState<any>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  const handleCreateShift = (shift: { name: string; startTime: string; endTime: string }) => {
    const newShift = { id: shifts.length + 1, ...shift }
    setShifts([...shifts, newShift])
  }

  const handleUpdateShift = (shift: { name: string; startTime: string; endTime: string }) => {
    if (!selectedShift) return
    const updated = shifts.map((s) => (s.id === selectedShift.id ? { ...s, ...shift } : s))
    setShifts(updated)
  }

  const handleDeleteShift = () => {
    if (!selectedShift) return
    setShifts(shifts.filter((s) => s.id !== selectedShift.id))
    setIsDeleteAlertOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Main Content ===== */}
      <div className="flex-grow w-full space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Shifts</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage work shifts such as Morning, Evening, or Night.
            </p>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setDialogMode("create")
              setSelectedShift(null)
              setIsDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Shift
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-2xl shadow-sm border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-slate-50/40">
                  <th className="px-5 py-4 text-left font-medium text-gray-500 text-sm">
                    Shift Name
                  </th>
                  <th className="px-5 py-4 text-center font-medium text-gray-500 text-sm">
                    Start Time
                  </th>
                  <th className="px-5 py-4 text-center font-medium text-gray-500 text-sm">
                    End Time
                  </th>
                  <th className="px-5 py-4 text-center font-medium text-gray-500 text-sm w-32">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {shifts.map((shift) => (
                  <tr
                    key={shift.id}
                    className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                  >
                    <td className="px-5 py-4 font-medium text-sm text-gray-800">
                      {shift.name}
                    </td>
                    <td className="px-5 py-4 text-center text-sm text-gray-600 font-medium">
                      {shift.startTime}
                    </td>
                    <td className="px-5 py-4 text-center text-sm text-gray-600 font-medium">
                      {shift.endTime}
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
                                setSelectedShift(shift)
                                setDialogMode("edit")
                                setIsDialogOpen(true)
                              }}
                            >
                              <Pencil className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer rounded-md px-3 py-2 hover:bg-red-50 hover:text-red-600"
                              onClick={() => {
                                setSelectedShift(shift)
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
        <div>Showing {shifts.length} of {shifts.length} shifts</div>

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
      <ShiftFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={selectedShift}
        onSubmit={(shift) =>
          dialogMode === "create"
            ? handleCreateShift(shift)
            : handleUpdateShift(shift)
        }
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this shift.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteShift}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
