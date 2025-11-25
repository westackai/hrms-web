"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft, Briefcase, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SalaryUpdatePage() {
    const [effectiveDate, setEffectiveDate] = useState<Date | undefined>();
    const router = useRouter();

    const salaryKeys = ["basic", "hra", "conveyance", "utility"] as const;
    const deductionKeys = [
        "pf",
        "esic",
        "professionalTax",
        "incomeTax",
        "loan",
        "healthInsurance",
    ] as const;

    type SalaryKey = typeof salaryKeys[number];
    type DeductionKey = typeof deductionKeys[number];

    const [salaryValues, setSalaryValues] = useState<Record<SalaryKey, string>>({
        basic: "",
        hra: "",
        conveyance: "",
        utility: "",
    });

    const [deductionValues, setDeductionValues] =
        useState<Record<DeductionKey, string>>({
            pf: "",
            esic: "",
            professionalTax: "",
            incomeTax: "",
            loan: "",
            healthInsurance: "",
        });

    // Number validation function
    const handleNumberInput = (value: string) => {
        const regex = /^\d*\.?\d*$/;
        return regex.test(value) ? value : "";
    };

    const grossEarning = (
        parseFloat(salaryValues.basic || "0") +
        parseFloat(salaryValues.hra || "0") +
        parseFloat(salaryValues.conveyance || "0") +
        parseFloat(salaryValues.utility || "0")
    ).toFixed(2);

    const totalDeductions = (
        parseFloat(deductionValues.pf || "0") +
        parseFloat(deductionValues.esic || "0") +
        parseFloat(deductionValues.professionalTax || "0") +
        parseFloat(deductionValues.incomeTax || "0") +
        parseFloat(deductionValues.loan || "0") +
        parseFloat(deductionValues.healthInsurance || "0")
    ).toFixed(2);

    const netPayable = (parseFloat(grossEarning) - parseFloat(totalDeductions)).toFixed(2);
    const annualCTC = (parseFloat(netPayable) * 12).toFixed(2);

    const [note, setNote] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSave = async () => {
        if (!effectiveDate) {
            toast.error("Please select an effective date", { position: "top-center" });
            return;
        }

        if (!salaryValues.basic || parseFloat(salaryValues.basic) <= 0) {
            toast.error("Please enter a valid basic salary", { position: "top-center" });
            return;
        }

        try {
            setIsUpdating(true);

            const payload = {
                employee: {
                    name: "John Doe",
                    employeeId: "EMP1023",
                    department: "Engineering",
                    position: "Software Developer",
                    joiningDate: "12 Jan 2022",
                    previousCtc: "450000",
                    previousMonthly: "37500",
                },
                effectiveDate: format(effectiveDate, "dd MMM yyyy"),
                salaryValues,
                deductionValues,
                grossEarning,
                totalDeductions,
                netPayable,
                annualCTC,
                note,
            };

            console.log("SALARY UPDATE PAYLOAD:", payload);

            await new Promise((res) => setTimeout(res, 1500));

            toast.success("Salary Updated Successfully!", { position: "top-center" });
        } catch {
            toast.error("Error updating salary!", { position: "top-center" });
        } finally {
            setIsUpdating(false);
        }
    };

    const RenderSalaryField = (label: string, key: SalaryKey, required = false) => {
        return (
            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input
                        value={salaryValues[key]}
                        onChange={(e) => {
                            const validValue = handleNumberInput(e.target.value);
                            setSalaryValues({
                                ...salaryValues,
                                [key]: validValue,
                            });
                        }}
                        placeholder="0.00"
                        className="h-11 pl-8 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>
            </div>
        );
    };

    const RenderDeductionField = (label: string, key: DeductionKey) => {
        return (
            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">{label}</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input
                        value={deductionValues[key]}
                        onChange={(e) => {
                            const validValue = handleNumberInput(e.target.value);
                            setDeductionValues({
                                ...deductionValues,
                                [key]: validValue,
                            });
                        }}
                        placeholder="0.00"
                        className="h-11 pl-8 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-white/80 rounded-full shadow-sm"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Salary Update
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Modify employee compensation details</p>
                    </div>
                </div>

                {/* Employee Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
                                JD
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <span className="font-medium">ID:</span> EMP1023
                                </p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                            <span className="text-green-700 font-medium text-sm">Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Position</p>
                                <p className="text-sm font-semibold text-gray-800 mt-1">Software Developer</p>
                                <p className="text-xs text-gray-600 mt-0.5">Engineering</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <CalendarIcon className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Joining Date</p>
                                <p className="text-sm font-semibold text-gray-800 mt-1">12 Jan 2022</p>
                                <p className="text-xs text-gray-600 mt-0.5">3+ years</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-green-50/50 rounded-xl border border-green-100">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Current CTC</p>
                                <p className="text-sm font-semibold text-gray-800 mt-1">₹ 4,50,000</p>
                                <p className="text-xs text-gray-600 mt-0.5">₹ 37,500 / month</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 space-y-8">
                    {/* Effective Date */}
                    <div className="pb-6 border-b border-gray-200">
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                            Effective Date <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full md:w-80 justify-start text-left h-12 border-gray-300 hover:border-blue-400 transition-colors",
                                        !effectiveDate && "text-gray-400"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {effectiveDate
                                        ? format(effectiveDate, "dd MMM yyyy")
                                        : "Select effective date"}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0 bg-white shadow-xl border border-gray-300 rounded-xl">
                                <Calendar
                                    mode="single"
                                    selected={effectiveDate}
                                    onSelect={setEffectiveDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Earnings and Deductions Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Earnings Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                                <h2 className="text-xl font-bold text-gray-800">Earnings</h2>
                            </div>

                            <div className="space-y-6 mb-6">
                                {RenderSalaryField("Basic Salary", "basic", true)}
                                {RenderSalaryField("House Rent Allowance (HRA)", "hra")}
                                {RenderSalaryField("Conveyance Allowance", "conveyance")}
                                {RenderSalaryField("Utility Allowance", "utility")}
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-5 rounded-xl border border-blue-200">
                                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Gross Earning</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700 font-semibold">₹</span>
                                    <Input
                                        disabled
                                        value={parseFloat(grossEarning).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        className="bg-white border-blue-200 h-12 pl-8 font-semibold text-blue-700 text-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Deductions Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-8 w-1 bg-red-600 rounded-full"></div>
                                <h2 className="text-xl font-bold text-gray-800">Deductions</h2>
                            </div>

                            <div className="space-y-6 mb-6">
                                {RenderDeductionField("Provident Fund", "pf")}
                                {RenderDeductionField("ESIC", "esic")}
                                {RenderDeductionField("Professional Tax", "professionalTax")}
                                {RenderDeductionField("Income Tax", "incomeTax")}
                                {RenderDeductionField("Loan / Advance", "loan")}
                                {RenderDeductionField("Health Insurance", "healthInsurance")}
                            </div>

                            <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-5 rounded-xl border border-red-200">
                                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Total Deductions</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-700 font-semibold">₹</span>
                                    <Input
                                        disabled
                                        value={parseFloat(totalDeductions).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        className="bg-white border-red-200 h-12 pl-8 font-semibold text-red-700 text-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                            <Label className="text-sm font-semibold text-gray-700 mb-3 block">Net Payable (Monthly)</Label>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-green-700">₹</span>
                                <span className="text-3xl font-bold text-green-700">
                                    {parseFloat(netPayable).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
                            <Label className="text-sm font-semibold text-gray-700 mb-3 block">Annual CTC</Label>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-purple-700">₹</span>
                                <span className="text-3xl font-bold text-purple-700">
                                    {parseFloat(annualCTC).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Additional Notes</Label>
                        <Input
                            placeholder="Add any relevant notes or comments..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <Button
                            variant="outline"
                            className="h-11 px-6 border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>

                        <Button
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-11 px-8 shadow-lg shadow-blue-500/30"
                            onClick={handleSave}
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Update Salary"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}