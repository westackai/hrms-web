"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function SalaryUpdate({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(undefined);

  const [ctc, setCtc] = useState("");
  const [monthly, setMonthly] = useState("");

  const [monthlyIncrement, setMonthlyIncrement] = useState("");
  const [newMonthly, setNewMonthly] = useState("");
  const [newCtc, setNewCtc] = useState("");

  const [note, setNote] = useState("");

  // ORIGINAL MONTHLY FROM CTC
  useEffect(() => {
    if (!ctc) {
      setMonthly("");
      return;
    }
    const numeric = parseFloat(ctc);
    if (numeric > 0) {
      const monthlySal = (numeric * 100000) / 12;
      setMonthly(monthlySal.toFixed(2));
    }
  }, [ctc]);

  // NEW MONTHLY & NEW CTC FROM MONTHLY INCREMENT
  useEffect(() => {
    if (!monthly || monthlyIncrement === "") {
      setNewMonthly("");
      setNewCtc("");
      return;
    }

    const baseMonthly = parseFloat(monthly);
    const inc = parseFloat(monthlyIncrement);

    const updatedMonthly = baseMonthly + inc;
    setNewMonthly(updatedMonthly.toFixed(2));

    const updatedCtc = (updatedMonthly * 12) / 100000;
    setNewCtc(updatedCtc.toFixed(2));
  }, [monthlyIncrement, monthly]);

  const handleSave = () => {
    const payload = {
      effectiveDate,
      ctc,
      monthly,
      monthlyIncrement,
      newMonthly,
      newCtc,
      note,
    };

    console.log("Created Salary Record:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 rounded-2xl overflow-hidden shadow-2xl border border-blue-200">

        {/* HEADER - MATCHED THEME */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Update Salary
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="p-6 bg-white grid gap-5">

          {/* EFFECTIVE DATE */}
          <div className="grid gap-2">
            <Label className="text-gray-500 font-medium">Effective Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-11 border-blue-300 hover:bg-blue-50",
                    !effectiveDate && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                  {effectiveDate ? format(effectiveDate, "dd MMM yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 bg-white border border-blue-200 rounded-lg shadow">
                <Calendar
                  mode="single"
                  selected={effectiveDate}
                  onSelect={setEffectiveDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* CTC + MONTHLY */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-gray-500 font-medium">Annual CTC (LPA)</Label>
              <Input
                placeholder="e.g. 4.5"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
                className="h-11 border-blue-300 focus:border-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-gray-500 font-medium">Monthly Salary </Label>
              <Input
                value={monthly}
                disabled
                className="h-11 bg-blue-50 text-gray-500 border-blue-200"
              />
            </div>
          </div>

          {/* MONTHLY INCREMENT */}
          <div className="grid gap-2">
            <Label className="text-gray-500 font-medium">Increment / Decrement (Monthly)</Label>
            <Input
              placeholder="e.g. 5000 or -3000"
              value={monthlyIncrement}
              onChange={(e) => setMonthlyIncrement(e.target.value)}
              className="h-11 border-blue-300 focus:border-blue-500"
            />
          </div>

          {/* NEW UPDATED VALUES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-gray-500 font-medium">Updated CTC </Label>
              <Input
                value={newCtc}
                disabled
                className="h-11 bg-blue-50 text-gray-500 border-blue-200"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-gray-500 font-medium">Updated Monthly Salary </Label>
              <Input
                value={newMonthly}
                disabled
                className="h-11 bg-blue-50 text-gray-500 border-blue-200"
              />
            </div>
          </div>

          {/* NOTE */}
          <div className="grid gap-2">
            <Label className="text-gray-500 font-medium">Note</Label>
            <Input
              placeholder="Write a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="h-11 border-blue-300 focus:border-blue-500"
            />
          </div>

        </div>

        {/* FOOTER - MATCHED THEME */}
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 h-11 text-base"
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogFooter>
        </div>

      </DialogContent>
    </Dialog>
  );
}
