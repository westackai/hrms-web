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

type BranchFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (name: string) => void
  initialData?: { id?: number; name: string }
  mode: "create" | "edit"
}

export default function BranchFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
}: BranchFormDialogProps) {
  const [branchName, setBranchName] = useState("")

  useEffect(() => {
    if (initialData?.name) {
      setBranchName(initialData.name)
    } else {
      setBranchName("")
    }
  }, [initialData, open])

  const handleSubmit = () => {
    if (!branchName.trim()) return
    onSubmit(branchName.trim())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Add New Branch" : "Edit Branch"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Add a new academic branch such as IT, Mechanical, or Civil."
              : "Edit the selected branch name below."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="branch-name" className="text-sm font-medium">
              Branch Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="branch-name"
              placeholder="e.g., Information Technology"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
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
            disabled={!branchName.trim()}
          >
            {mode === "create" ? "Add Branch" : "Update Branch"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
