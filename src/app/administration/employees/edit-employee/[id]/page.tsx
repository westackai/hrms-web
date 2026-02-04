"use client"

import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BasicDetails from "@/components/employee/BasicDetails"
import EducationDetails from "@/components/employee/EducationDetails"
import EmployeeDetails from "@/components/employee/EmployeeDetails"
import BankDetails from "@/components/employee/BankDetails"
import AdditionalInfo from "@/components/employee/AdditionalInfo"
import { User, Briefcase, CreditCard, CheckCircle, School, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const phoneReg = /^[0-9]{10}$/

const Step1Schema = Yup.object({
    employeeCode: Yup.string().required("Employee Code is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.string().required("Date of Birth is required"),
    mobileNumber: Yup.string().matches(phoneReg, "Enter valid 10 digit number").required("Mobile Number is required"),
})
const Step2Schema = Yup.object({
    doj: Yup.string().required("Date of Joining is required"),
    department: Yup.string().required("Department is required"),
    designation: Yup.string().required("Designation is required"),
    employeeType: Yup.string().required("Employee Type is required"),
    workMode: Yup.string().required("Work Mode is required"),
})
const Step3Schema = Yup.object({
    bankName: Yup.string().nullable(),
    accountHolderName: Yup.string().nullable(),
    accountNumber: Yup.string().nullable(),
    ifscCode: Yup.string().nullable(),
    branchName: Yup.string().nullable(),
    bankPanNumber: Yup.string().nullable(),
})

export default function EditEmployeePage() {
    const router = useRouter()
    const [activeIndex, setActiveIndex] = useState<number>(1) // ✅ start from 2nd tab
    const [completedTabs, setCompletedTabs] = useState<number[]>([0]) // ✅ Basic Details considered completed
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            employeeCode: "",
            firstName: "",
            middleName: "",
            lastName: "",
            gender: "",
            dob: "",
            maritalStatus: "",
            bloodGroup: "",
            mobileNumber: "",
            officialEmail: "",
            personalEmail: "",
            doj: "",
            department: "",
            designation: "",
            employeeType: "",
            workMode: "",
            reportingManager: "",
            workLocation: "",
            shiftTiming: "",
            employeeStatus: "",
            bankName: "",
            accountHolderName: "",
            accountNumber: "",
            ifscCode: "",
            branchName: "",
            bankPanNumber: "",
        },
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true)
            await new Promise((r) => setTimeout(r, 1200))
            console.log("Submitted:", values)
            toast.success("Employee details submitted successfully!", { position: "top-center" })
            setIsSubmitting(false)
            resetForm()
            setActiveIndex(1)
            localStorage.removeItem("employeeBasic")
            setCompletedTabs([0]) // ✅ keep Basic Details completed even after reset
        },
    })

    useEffect(() => {
        const basic = localStorage.getItem("employeeBasic")
        if (basic) {
            try {
                const parsed = JSON.parse(basic)
                formik.setValues((v) => ({ ...v, ...parsed }))
            } catch { }
        }
    }, [])

    const validateStep = async (step: number) => {
        try {
            if (step === 0) await Step1Schema.validate(formik.values, { abortEarly: false })
            if (step === 1) await Step2Schema.validate(formik.values, { abortEarly: false })
            if (step === 2) await Step3Schema.validate(formik.values, { abortEarly: false })
            formik.setErrors({})
            return true
        } catch (err: any) {
            const errors: Record<string, string> = {}
            if (err.inner && err.inner.length) {
                err.inner.forEach((e: any) => {
                    if (e.path && !errors[e.path]) errors[e.path] = e.message
                })
            }
            formik.setErrors(errors)
            const first = Object.values(errors)[0]
            if (first) toast.error(first, { position: "top-center" })
            return false
        }
    }

    const handleNext = async () => {
        const ok = await validateStep(activeIndex)
        if (!ok) return

        // ✅ mark current tab completed only when saved
        if (!completedTabs.includes(activeIndex)) {
            setCompletedTabs((prev) => [...prev, activeIndex])
        }

        if (activeIndex < 4) setActiveIndex((s) => s + 1)
    }

    const handleBack = () => {
        if (activeIndex > 0) setActiveIndex((s) => s - 1)
    }

    const titles = ["Basic Details", "Employee Details", "Bank & ID Details", "Educational Details", "Additional Info"]

    return (
        <div className="p-6">
            <Card className="shadow-md border border-gray-200 rounded-xl">
                <CardHeader className="border-b pb-4 border-gray-300 flex items-center space-x-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <CardTitle className="text-blue-600 text-xl font-semibold">Edit Employee</CardTitle>
                </CardHeader>

                <CardContent className="pt-3">
                    <Tabs value={String(activeIndex)}>
                        <TabsList className="grid grid-cols-5 gap-2 mb-12 bg-gray-50 p-3 rounded-lg">
                            {titles.map((t, idx) => {
                                const isActive = idx === activeIndex
                                const isCompleted = completedTabs.includes(idx)
                                const isUpcoming = !isActive && !isCompleted

                                return (
                                    <TabsTrigger
                                        key={t}
                                        value={String(idx)}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setActiveIndex(idx) // freely switch tabs
                                        }}
                                        className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive
                                                ? "bg-white shadow-md ring-2 ring-blue-500"
                                                : "bg-transparent"
                                            }
            ${isUpcoming
                                                ? "opacity-40 cursor-pointer hover:opacity-60"
                                                : "cursor-pointer"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div
                                                className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all
                ${isActive
                                                        ? "border-blue-600 bg-blue-600"
                                                        : isCompleted
                                                            ? "border-green-500 bg-green-500"
                                                            : "border-gray-300 bg-gray-400"
                                                    }`}
                                            >
                                                {idx === 0 && <User className="w-5 h-5 text-white" />}
                                                {idx === 1 && <Briefcase className="w-5 h-5 text-white" />}
                                                {idx === 2 && <CreditCard className="w-5 h-5 text-white" />}
                                                {idx === 3 && <School className="w-5 h-5 text-white" />}
                                                {idx === 4 && <CheckCircle className="w-5 h-5 text-white" />}
                                            </div>
                                            <div className="flex flex-col text-left flex-1">
                                                <span
                                                    className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-800"
                                                        }`}
                                                >
                                                    {t}
                                                </span>
                                                <span className="text-xs text-gray-500 mt-0.5">
                                                    {isCompleted
                                                        ? "Completed"
                                                        : isActive
                                                            ? "In progress"
                                                            : "Upcoming"}
                                                </span>
                                            </div>
                                        </div>
                                    </TabsTrigger>
                                )
                            })}
                        </TabsList>
                    </Tabs>


                    <div className="bg-white p-8 mt-4 rounded-md border border-gray-100 shadow-sm">
                        {activeIndex === 0 && <BasicDetails formik={formik} />}
                        {activeIndex === 1 && <EmployeeDetails formik={formik} />}
                        {activeIndex === 2 && <BankDetails formik={formik} />}
                        {activeIndex === 3 && <EducationDetails formik={formik} />}
                        {activeIndex === 4 && <AdditionalInfo formik={formik} />}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        {activeIndex > 0 && (
                            <Button variant="outline" onClick={handleBack} className="h-10">
                                Back
                            </Button>
                        )}
                        {activeIndex === 0 && (
                            <Button onClick={() => router.back()} className="h-10 bg-red-500 hover:bg-red-600 text-white">
                                Cancel
                            </Button>
                        )}

                        <div className="flex items-center gap-3">
                            {activeIndex < 4 ? (
                                <Button onClick={handleNext} className="h-10 bg-blue-600 hover:bg-blue-700 text-white">
                                    Save & Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => formik.handleSubmit()}
                                    className="h-10 bg-green-600 hover:bg-green-700 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit All"}
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
