"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  formik: any
}

export default function EmployeeDetails({ formik }: Props) {
  const getInputClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  const getSelectClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300"
      : "h-11"
  }

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-500 mb-4">Employee Details:</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-medium">Date of Joining<span className="text-red-500">*</span></Label>
          <Input type="date" name="doj" value={formik.values.doj} onChange={formik.handleChange} className={getInputClasses("doj")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Employee Type<span className="text-red-500">*</span></Label>
          <Select value={formik.values.employeeType} onValueChange={(v) => formik.setFieldValue("employeeType", v)}>
            <SelectTrigger className={getSelectClasses("employeeType")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Full Time">Full Time</SelectItem>
              <SelectItem value="Part Time">Part Time</SelectItem>
              <SelectItem value="Intern">Intern</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Department<span className="text-red-500">*</span></Label>
          <Select value={formik.values.department} onValueChange={(v) => formik.setFieldValue("department", v)}>
            <SelectTrigger className={getSelectClasses("department")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Software Development / Engineering">Software Development / Engineering</SelectItem>
              <SelectItem value="HR / People">HR / People</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Admin / Accounts">Admin / Accounts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Work Mode<span className="text-red-500">*</span></Label>
          <Select value={formik.values.workMode} onValueChange={(v) => formik.setFieldValue("workMode", v)}>
            <SelectTrigger className={getSelectClasses("workMode")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Office">Office</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Designation<span className="text-red-500">*</span></Label>
          <Select value={formik.values.designation} onValueChange={(v) => formik.setFieldValue("designation", v)}>
            <SelectTrigger className={getSelectClasses("designation")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
              <SelectItem value="AI/Automation Developer">AI/Automation Developer</SelectItem>
              <SelectItem value="HR Executive">HR Executive</SelectItem>
              <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Reporting Manager</Label>
          <Input name="reportingManager" value={formik.values.reportingManager} onChange={formik.handleChange} placeholder="Manager name" className={getInputClasses("reportingManager")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Work Location / Branch</Label>
          <Input name="workLocation" value={formik.values.workLocation} onChange={formik.handleChange} placeholder="Branch or location" className={getInputClasses("workLocation")} />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Shift Timing</Label>
          <Select value={formik.values.shiftTiming} onValueChange={(v) => formik.setFieldValue("shiftTiming", v)}>
            <SelectTrigger className={getSelectClasses("shiftTiming")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Morning">Morning</SelectItem>
              <SelectItem value="Evening">Evening</SelectItem>
              <SelectItem value="Night">Night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Employee Status</Label>
          <Select value={formik.values.employeeStatus} onValueChange={(v) => formik.setFieldValue("employeeStatus", v)}>
            <SelectTrigger className={getSelectClasses("employeeStatus")}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Resigned">Resigned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

    </section>
  )
}
