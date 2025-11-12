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

type EmploymentTypeFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string) => void
  initialData?: { id?: number; name: string }
  mode: "create" | "edit"
}

export default function EmploymentTypeFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: EmploymentTypeFormDialogProps) {
  const [typeName, setTypeName] = useState("")

  useEffect(() => {
    if (initialData?.name) {
      setTypeName(initialData.name)
    } else {
      setTypeName("")
    }
  }, [initialData, open])

  const handleSubmit = () => {
    if (!typeName.trim()) return
    onSubmit(typeName.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Add Employment Type" : "Edit Employment Type"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Add a new employment type such as Full-Time, Part-Time, or Intern."
              : "Edit the selected employment type below."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type-name" className="text-sm font-medium">
              Employment Type <span className="text-red-500">*</span>
            </Label>
            <Input
              id="type-name"
              placeholder="e.g., Full-Time"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              className="w-full focus:ring-blue-500 focus:border-transparent"
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
            disabled={!typeName.trim()}
          >
            {mode === "create" ? "Add Type" : "Update Type"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
