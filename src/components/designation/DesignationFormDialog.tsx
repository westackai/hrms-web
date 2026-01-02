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

type DesignationFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string) => void
  initialData?: { id?: string; name: string }
  mode: "create" | "edit"
}

export default function DesignationFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: DesignationFormDialogProps) {
  const [designationName, setDesignationName] = useState("")

  useEffect(() => {
    setDesignationName(initialData?.name || "")
  }, [initialData, open])

  const handleSubmit = () => {
    if (!designationName.trim()) return
    onSubmit(designationName.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Create New Designation" : "Edit Designation"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new designation to your organization."
              : "Update the designation name and save changes."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-2">
          <Label htmlFor="designation-name">
            Designation Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="designation-name"
            placeholder="e.g., Senior Developer"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
          />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!designationName.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {mode === "create" ? "Add Designation" : "Update Designation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
