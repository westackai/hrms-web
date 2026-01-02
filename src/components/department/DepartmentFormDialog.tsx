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

/* ================= TYPES ================= */

type DepartmentFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string) => void
  initialData?: { id?: string; name: string }
  mode: "create" | "edit"
}

/* ================= COMPONENT ================= */

export default function DepartmentFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: DepartmentFormDialogProps) {
  const [departmentName, setDepartmentName] = useState("")

  useEffect(() => {
    if (initialData?.name) {
      setDepartmentName(initialData.name)
    } else {
      setDepartmentName("")
    }
  }, [initialData, open])

  const handleSubmit = () => {
    if (!departmentName.trim()) return
    onSubmit(departmentName.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Create New Department" : "Edit Department"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Add a new department to your organization. Fill in the details below."
              : "Update the department name and save your changes."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="department-name" className="text-sm font-medium">
              Department Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="department-name"
              placeholder="e.g., Software Development"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              setDepartmentName("")
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={!departmentName.trim()}
          >
            {mode === "create" ? "Add Department" : "Update Department"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
