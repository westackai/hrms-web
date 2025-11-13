"use client"

import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BasicDetails from "@/components/employee/BasicDetails"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Briefcase, CreditCard, School, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const Step1Schema = Yup.object({
  employeeCode: Yup.string().required("Employee Code is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("Date of Birth is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit number")
    .required("Mobile Number is required"),
})

export default function AddEmployeePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [SubmitAndUpdating, setSubmitAndUpdating] = useState(false)

  const formik = useFormik({
    initialValues: {
      employeeCode: "EMP001",
      firstName: "John",
      middleName: "A.",
      lastName: "Doe",
      gender: "Male",
      dob: "1995-01-01",
      maritalStatus: "Single",
      bloodGroup: "O+",
      mobileNumber: "9876543210",
      officialEmail: "john.doe@company.com",
      personalEmail: "john.doe@example.com",
    },
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 700))
      localStorage.setItem("employeeBasic", JSON.stringify(values))
      toast.success("Employee added!", { position: "top-center" })
      router.push("/employees/edit-employee")
    },
  })

  const handleSaveUpdate = async () => {
    try {
      await Step1Schema.validate(formik.values, { abortEarly: false })
      formik.setErrors({})
      setSubmitAndUpdating(true)
      await formik.submitForm()
      setSubmitAndUpdating(false)
    } catch (err: any) {
      setSubmitAndUpdating(false)
      const errors: Record<string, string> = {}
      if (err.inner && err.inner.length) {
        err.inner.forEach((e: any) => {
          if (e.path && !errors[e.path]) errors[e.path] = e.message
        })
      }
      formik.setErrors(errors)
      const first = Object.values(errors)[0]
      if (first) toast.error(first, { position: "top-center" })
    }
  }

  const handleSaveOnly = async () => {
    try {
      await Step1Schema.validate(formik.values, { abortEarly: false })
      formik.setErrors({})
      setIsSubmitting(true)
      await new Promise((r) => setTimeout(r, 700))
      localStorage.setItem("employeeBasic", JSON.stringify(formik.values))
      toast.success("Employee added!", { position: "top-center" })
      setIsSubmitting(false)
    } catch (err: any) {
      setIsSubmitting(false)
      const errors: Record<string, string> = {}
      if (err.inner && err.inner.length) {
        err.inner.forEach((e: any) => {
          if (e.path && !errors[e.path]) errors[e.path] = e.message
        })
      }
      formik.setErrors(errors)
      const first = Object.values(errors)[0]
      if (first) toast.error(first, { position: "top-center" })
    }
  }

  const titles = [
    "Basic Details",
    "Employee Details",
    "Bank & ID Details",
    "Educational Details",
    "Additional Info",
  ]

  return (
    <div className="p-6">
      <Card className="shadow-md border border-gray-200 rounded-xl">
        {/* Header */}
        <CardHeader className="border-b pb-4 border-gray-300 flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-blue-600 text-xl font-semibold">
            Add Employee
          </CardTitle>
        </CardHeader>

        {/* Tabs */}
        <CardContent className="pt-3">
          <Tabs value="0">
            <TabsList className="grid grid-cols-5 gap-2 mb-12 bg-gray-50 p-3 rounded-lg">
              {titles.map((t, idx) => (
                <TabsTrigger
                  key={t}
                  value={String(idx)}
                  disabled={idx !== 0}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    idx === 0
                      ? "bg-white shadow-md ring-2 ring-blue-500"
                      : "bg-transparent opacity-40 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${
                        idx === 0
                          ? "border-blue-600 bg-blue-600"
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
                        className={`text-sm font-medium ${
                          idx === 0 ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {t}
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5">
                        {idx === 0 ? "In progress" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Only Basic Details Form */}
          <div className="bg-white p-8 mt-4 rounded-md border border-gray-100 shadow-sm">
            <BasicDetails formik={formik} />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <Button
              className="h-10 bg-red-500 hover:bg-red-600 text-white"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button
                onClick={handleSaveOnly}
                disabled={isSubmitting}
                className="h-10 px-6 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>

              <Button
                onClick={handleSaveUpdate}
                disabled={SubmitAndUpdating}
                className="h-10 px-6 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-300"
              >
                {SubmitAndUpdating ? "Saving..." : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
