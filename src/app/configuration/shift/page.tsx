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
  showAllShifts,
  createShift,
  updateShift,
  deleteShift,
} from "@/network/Api"
import ShiftFormDialog from "@/components/shift/ShiftFormDialog"

/* ---------------- TYPES ---------------- */

type Shift = {
  id: string
  name: string
  startTime: string
  endTime: string
}

/* ---------------- COMPONENT ---------------- */

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create")
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

  /* ---------------- FETCH ---------------- */

  const fetchShifts = async () => {
    try {
      setLoading(true)
      const res = await showAllShifts()

      if (res?.data) {
        setShifts(
          res.data.map((s: any) => ({
            id: s.id,
            name: s.shift_name,
            startTime: s.start_time,
            endTime: s.endtime,
          }))
        )
      }
    } catch {
      toast.error("Failed to fetch shifts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShifts()
  }, [])

  /* ---------------- CREATE ---------------- */

  const handleCreateShift = async (shift: {
    name: string
    startTime: string
    endTime: string
  }) => {
    try {
      const res = await createShift({
        shift_name: shift.name,
        start_time: shift.startTime,
        endtime: shift.endTime,
      })

      if (res?.data) {
        setShifts((prev) => [
          ...prev,
          {
            id: res.data.id,
            name: res.data.shift_name,
            startTime: res.data.start_time,
            endTime: res.data.endtime,
          },
        ])
        toast.success("Shift created successfully")
      }
    } catch (error : any) {
      console.error(error)
      toast.error(error?.data?.detail || "Failed to create shift")
    }
  }

  /* ---------------- UPDATE ---------------- */

  const handleUpdateShift = async (shift: {
    name: string
    startTime: string
    endTime: string
  }) => {
    if (!selectedShift) return

    try {
      const res = await updateShift(selectedShift.id, {
        shift_name: shift.name,
        start_time: shift.startTime,
        endtime: shift.endTime,
      })

      if (res?.data) {
        setShifts((prev) =>
          prev.map((s) =>
            s.id === selectedShift.id
              ? {
                  ...s,
                  name: res.data.shift_name,
                  startTime: res.data.start_time,
                  endTime: res.data.endtime,
                }
              : s
          )
        )
        toast.success("Shift updated successfully")
        setSelectedShift(null)
      }
    } catch {
      toast.error("Failed to update shift")
    }
  }

  /* ---------------- DELETE ---------------- */

  const handleDeleteShift = async () => {
    if (!selectedShift) return

    try {
      await deleteShift(selectedShift.id)
      setShifts((prev) =>
        prev.filter((s) => s.id !== selectedShift.id)
      )
      toast.success("Shift deleted successfully")
    } catch {
      toast.error("Failed to delete shift")
    } finally {
      setIsDeleteAlertOpen(false)
      setSelectedShift(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow w-full space-y-4 p-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Shift</h1>
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
                    Shift Name
                  </TableHead>
                  <TableHead className="px-5 py-4 text-center text-sm">
                    Start Time
                  </TableHead>
                  <TableHead className="px-5 py-4 text-center text-sm">
                    End Time
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
                        <div className="h-4 w-16 bg-gray-200 rounded mx-auto animate-pulse" />
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center">
                        <div className="h-4 w-16 bg-gray-200 rounded mx-auto animate-pulse" />
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center">
                        <div className="h-8 w-8 bg-gray-200 rounded mx-auto animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  shifts.map((shift) => (
                    <TableRow
                      key={shift.id}
                      className="border-b border-gray-100 hover:bg-slate-50/40 h-[68px]"
                    >
                      <TableCell className="px-5 py-4 font-medium text-sm">
                        {shift.name}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center text-sm font-medium">
                        {shift.startTime}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center text-sm font-medium">
                        {shift.endTime}
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
                                  setSelectedShift(shift)
                                  setDialogMode("edit")
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
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
      <ShiftFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={selectedShift ?? undefined}
        onSubmit={(shift) =>
          dialogMode === "create"
            ? handleCreateShift(shift)
            : handleUpdateShift(shift)
        }
      />

      {/* DELETE ALERT */}
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
              className="bg-red-600 text-white"
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
