"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  formik: any
}

export default function BasicDetails({ formik }: Props) {
  const getInputClasses = (field: string) =>
    formik.values[field] ? "h-11 bg-blue-50 border-blue-300" : "h-11"

  const getSelectClasses = (field: string) =>
    formik.values[field] ? "h-11 bg-blue-50 border-blue-300" : "h-11"

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-500 mb-4">
        Basic Details:
      </h3>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Employee Code</Label>
          <Input name="employeeCode" value={formik.values.employeeCode} onChange={formik.handleChange} className={getInputClasses("employeeCode")} />
        </div>

        <div className="space-y-2">
          <Label>Mobile Number<span className="text-red-500">*</span></Label>
          <div className="flex gap-2">
            <Input value="+91" disabled className="w-20 h-11 bg-gray-50" />
            <Input
              name="mobileNumber"
              maxLength={10}
              value={formik.values.mobileNumber}
              onChange={(e) =>
                formik.setFieldValue("mobileNumber", e.target.value.replace(/\D/g, ""))
              }
              className={getInputClasses("mobileNumber") + " flex-1"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>First Name<span className="text-red-500">*</span></Label>
          <Input name="firstName" value={formik.values.firstName} onChange={formik.handleChange} className={getInputClasses("firstName")} />
        </div>

        <div className="space-y-2">
          <Label>Official Email</Label>
          <Input name="officialEmail" type="email" value={formik.values.officialEmail} onChange={formik.handleChange} className={getInputClasses("officialEmail")} />
        </div>

        <div className="space-y-2">
          <Label>Middle Name</Label>
          <Input name="middleName" value={formik.values.middleName} onChange={formik.handleChange} className={getInputClasses("middleName")} />
        </div>

        <div className="space-y-2">
          <Label>Personal Email<span className="text-red-500">*</span></Label>
          <Input name="personalEmail" type="email" value={formik.values.personalEmail} onChange={formik.handleChange} className={getInputClasses("personalEmail")} />
        </div>

        <div className="space-y-2">
          <Label>Last Name<span className="text-red-500">*</span></Label>
          <Input name="lastName" value={formik.values.lastName} onChange={formik.handleChange} className={getInputClasses("lastName")} />
        </div>

        <div className="space-y-2">
          <Label>Date of Birth<span className="text-red-500">*</span></Label>
          <Input
            type="date"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            max={new Date().toISOString().split("T")[0]}
            className={getInputClasses("dob")}
          />
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Gender<span className="text-red-500">*</span></Label>
          <div className="flex gap-6 pt-1">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formik.values.gender === g}
                  onChange={formik.handleChange}
                  className="accent-blue-600"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Marital Status</Label>
          <Select value={formik.values.maritalStatus} onValueChange={(v) => formik.setFieldValue("maritalStatus", v)}>
            <SelectTrigger className={getSelectClasses("maritalStatus")}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {["Single", "Married", "Divorced", "Widowed"].map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Blood Group</Label>
          <Select value={formik.values.bloodGroup} onValueChange={(v) => formik.setFieldValue("bloodGroup", v)}>
            <SelectTrigger className={getSelectClasses("bloodGroup")}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
