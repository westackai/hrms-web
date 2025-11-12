"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ShiftFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (shift: { name: string; startTime: string; endTime: string }) => void
  initialData?: { id?: number; name: string; startTime: string; endTime: string }
  mode: "create" | "edit"
}

export default function ShiftFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: ShiftFormDialogProps) {
  const [shiftName, setShiftName] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  useEffect(() => {
    if (initialData) {
      setShiftName(initialData.name || "")
      setStartTime(initialData.startTime || "")
      setEndTime(initialData.endTime || "")
    } else {
      setShiftName("")
      setStartTime("")
      setEndTime("")
    }
  }, [initialData, open])

  const handleSubmit = () => {
    if (!shiftName.trim() || !startTime.trim() || !endTime.trim()) return
    onSubmit({ name: shiftName.trim(), startTime, endTime })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Add New Shift" : "Edit Shift"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Add a new shift such as Morning, Evening, or Night."
              : "Edit the selected shift details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="shift-name">
              Shift Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shift-name"
              placeholder="e.g., Morning Shift"
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-time">
              Start Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-time">
              End Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={!shiftName.trim() || !startTime || !endTime}
          >
            {mode === "create" ? "Add Shift" : "Update Shift"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
