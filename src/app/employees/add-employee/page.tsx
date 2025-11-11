"use client"

import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import BasicDetails from "@/components/employee/BasicDetails"
import EducationDetails from "@/components/employee/EducationDetails"
import EmployeeDetails from "@/components/employee/EmployeeDetails"
import BankDetails from "@/components/employee/BankDetails"
import AdditionalInfo from "@/components/employee/AdditionalInfo"



import { User, Briefcase, CreditCard, CheckCircle, School } from "lucide-react"

type FormValues = {
    employeeCode: string
    firstName: string
    middleName: string
    lastName: string
    gender: string
    dob: string
    maritalStatus: string
    bloodGroup: string
    mobileNumber: string
    officialEmail: string
    personalEmail: string
    doj: string
    department: string
    designation: string
    employeeType: string
    workMode: string
    reportingManager: string
    workLocation: string
    shiftTiming: string
    employeeStatus: string
    bankName: string
    accountHolderName: string
    accountNumber: string
    ifscCode: string
    branchName: string
    bankPanNumber: string
}

const phoneReg = /^[0-9]{10}$/

// Step-wise Yup schemas
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

export default function AddEmployeeWizardPage() {
    const [activeIndex, setActiveIndex] = useState<number>(0) // 0..3
    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik<FormValues>({
        initialValues: {
            employeeCode: "16",
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
        validationSchema: undefined, // we validate per-step manually
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true)
            // simulate API call
            await new Promise((r) => setTimeout(r, 1200))
            console.log("Final submitted payload:", values)
            toast.success("Employee details submitted successfully!", { position: "top-center" })
            setIsSubmitting(false)
            resetForm()
            setActiveIndex(0)
            localStorage.removeItem("employeeDraft")
        },
    })

    // load draft if present
    // useEffect(() => {
    //     const draft = localStorage.getItem("employeeDraft")
    //     if (draft) {
    //         try {
    //             const parsed = JSON.parse(draft)
    //             formik.setValues({ ...formik.initialValues, ...parsed })
    //             toast.success("Loaded saved draft", { position: "top-center", duration: 1500 })
    //         } catch (e) {
    //             // ignore
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // validate current step using corresponding schema
    const validateStep = async (step: number) => {
        try {
            if (step === 0) await Step1Schema.validate(formik.values, { abortEarly: false })
            if (step === 3) await Step2Schema.validate(formik.values, { abortEarly: false })
            if (step === 4) await Step3Schema.validate(formik.values, { abortEarly: false })
            // clear step-related errors
            formik.setErrors({})
            return true
        } catch (err: any) {
            // collect errors and set on formik
            const yupErr = err
            const errors: Record<string, string> = {}
            if (yupErr.inner && yupErr.inner.length) {
                yupErr.inner.forEach((e: any) => {
                    if (e.path && !errors[e.path]) errors[e.path] = e.message
                })
            } else if (yupErr.path) {
                errors[yupErr.path] = yupErr.message
            }
            formik.setErrors(errors)
            // mark touched for visible validation
            const touched: any = {}
            Object.keys(errors).forEach(k => (touched[k] = true))
            formik.setTouched({ ...formik.touched, ...touched })
            // show top toast for first error
            const first = Object.values(errors)[0]
            if (first) {
                toast.error(first, { position: "top-center", duration: 3500 })
            }
            return false
        }
    }

    const handleNext = async () => {
        const ok = await validateStep(activeIndex)
        if (!ok) return
        if (activeIndex < 4) setActiveIndex((s) => s + 1)
    }

    const handleBack = () => {
        if (activeIndex > 0) setActiveIndex((s) => s - 1)
    }

    const handleSaveDraft = () => {
        setIsSavingDraft(true)
        // save to localStorage
        localStorage.setItem("employeeDraft", JSON.stringify(formik.values))
        setTimeout(() => {
            setIsSavingDraft(false)
            toast.success("Draft saved", { position: "top-center" })
        }, 600)
    }


    // header titles
    const titles = ["Basic Details", "Educational Details", "Employee Details", "Bank Details", "Additional Info"]

    return (
        <div className="p-6">
            <Card className="shadow-md border border-gray-200 rounded-xl">
                <CardHeader className="border-b pb-4 border-gray-300">
                    <CardTitle className="text-blue-600 text-xl font-semibold">Add Employee</CardTitle>
                </CardHeader>

                <CardContent className="pt-3">
                    <div className="space-y-6">
                        {/* Top stepper using shadcn Tabs but we will control switching */}
                        <Tabs value={String(activeIndex)}>
                            <TabsList className="grid grid-cols-5 gap-4 mb-12 bg-gray-50 p-4 rounded-lg">
                                {titles.map((t, idx) => {
                                    const disabled = idx > activeIndex
                                    const active = idx === activeIndex
                                    const completed = idx < activeIndex

                                    return (
                                        <TabsTrigger
                                            key={t}
                                            value={String(idx)}
                                            onClick={(e: any) => {
                                                e.preventDefault()
                                                if (idx <= activeIndex) setActiveIndex(idx)
                                            }}
                                            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active ? "bg-white shadow-md ring-2 ring-blue-500" : "bg-transparent hover:bg-white/50"} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${completed ? "hover:bg-white/70" : ""} justify-start`}
                                        >
                                            <div className="flex items-center gap-3 w-full">
                                                <div
                                                    className={`
                            w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200
                            ${active ? "border-blue-600 bg-blue-600 shadow-lg shadow-blue-200" : ""}
                            ${completed ? "border-green-500 bg-green-500" : ""}
                            ${!active && !completed ? "border-gray-300 bg-white" : ""}
                          `}
                                                >
                                                    {idx === 0 && <User className={`w-5 h-5 ${active || completed ? "text-white" : "text-gray-500"}`} />}
                                                    {idx === 1 && <School className={`w-5 h-5 ${active || completed ? "text-white" : "text-gray-500"}`} />}
                                                    {idx === 2 && <Briefcase className={`w-5 h-5 ${active || completed ? "text-white" : "text-gray-500"}`} />}
                                                    {idx === 3 && <CreditCard className={`w-5 h-5 ${active || completed ? "text-white" : "text-gray-500"}`} />}
                                                    {idx === 4 && <CheckCircle className={`w-5 h-5 ${active || completed ? "text-white" : "text-gray-500"}`} />}
                                                    {/* {idx === 5 && <CheckCircle className={`w-5 h-5 ${active || completed ? "text-white" : "text-gray-500"}`} />} */}
                                                </div>
                                                <div className="flex flex-col text-left flex-1">
                                                    <span className={`
                            text-sm font-medium
                            ${active ? "text-blue-600" : ""}
                            ${completed ? "text-green-600" : ""}
                            ${!active && !completed ? "text-gray-600" : ""}
                          `}>
                                                        {t}
                                                    </span>
                                                    <span className="text-xs text-gray-500 mt-0.5">
                                                        {completed ? "Completed" : active ? "In progress" : "Upcoming"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Progress connector line */}
                                            {/* {idx < 3 && (
                                                <div className={`
                          absolute top-1/2 -right-4 w-4 h-0.5 -translate-y-1/2
                          ${completed ? "bg-green-500" : "bg-gray-300"}
                        `} />
                                            )} */}
                                        </TabsTrigger>
                                    )
                                })}
                            </TabsList>
                        </Tabs>

                        {/* Content */}
                        <div className="bg-white p-8 rounded-md border border-gray-100 shadow-sm">
                            {activeIndex === 0 && <BasicDetails formik={formik} />}
                            {activeIndex === 1 && <EducationDetails formik={formik} />}
                            {activeIndex === 2 && <EmployeeDetails formik={formik} />}
                            {activeIndex === 3 && <BankDetails formik={formik} />}
                            {activeIndex === 4 && <AdditionalInfo formik={formik} />}
                            
                        </div>

                        {/* Footer controls */}
                        <div className="flex items-center justify-between">
                            <div>
                                {activeIndex > 0 && (
                                    <Button variant="outline" onClick={handleBack} className="mr-2 h-10">
                                        Back
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Save draft (doesn't submit to server) */}
                                <Button variant="ghost" onClick={handleSaveDraft} disabled={isSavingDraft} className="h-10">
                                    {isSavingDraft ? "Saving..." : "Save Draft"}
                                </Button>

                                {activeIndex < 4 ? (
                                    <Button onClick={handleNext} className="h-10 bg-blue-600 hover:bg-blue-700 text-white">
                                        Save & Next
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            // final validation for all steps before submit
                                            Promise.all([Step1Schema.validate(formik.values, { abortEarly: false }), Step2Schema.validate(formik.values, { abortEarly: false }), Step3Schema.validate(formik.values, { abortEarly: false })])
                                                .then(() => {
                                                    formik.handleSubmit()
                                                })
                                                .catch((err) => {
                                                    // compile errors and show
                                                    const errors: Record<string, string> = {}
                                                    if (Array.isArray(err)) {
                                                        err.forEach((y: any) => {
                                                            if (y.inner) y.inner.forEach((i: any) => (errors[i.path] = i.message))
                                                        })
                                                    } else if (err.inner) {
                                                        err.inner.forEach((i: any) => (errors[i.path] = i.message))
                                                    }
                                                    formik.setErrors(errors)
                                                    // show first error
                                                    const first = Object.values(errors)[0]
                                                    if (first) toast.error(first, { position: "top-center" })
                                                })
                                        }}
                                        className="h-10 bg-green-600 hover:bg-green-700 text-white"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit All"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
