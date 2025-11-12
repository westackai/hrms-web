"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  formik: any
}

export default function BankDetails({ formik }: Props) {
  const getInputClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  const getUploadClasses = (fieldName: string) => {
    const hasFile = formik.values[fieldName]
    return hasFile
      ? "h-11 w-full text-sm text-blue-900 bg-blue-50 border border-blue-300 rounded-md cursor-pointer focus:outline-none file:h-full file:border-0 file:bg-blue-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
      : "h-11 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none file:h-full file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
  }

  return (
    <section>
      {/* ================= BANK DETAILS ================= */}
      <h3 className="text-lg font-semibold text-gray-500 mb-4">
        Bank Details:
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Bank Name */}
        <div className="space-y-2">
          <Label className="font-medium">Bank Name</Label>
          <Input
            name="bankName"
            value={formik.values.bankName}
            onChange={formik.handleChange}
            className={getInputClasses("bankName")}
          />
        </div>

        {/* Account Holder Name */}
        <div className="space-y-2">
          <Label className="font-medium">Account Holder Name</Label>
          <Input
            name="accountHolderName"
            value={formik.values.accountHolderName}
            onChange={formik.handleChange}
            className={getInputClasses("accountHolderName")}
          />
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label className="font-medium">Account Number</Label>
          <Input
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={(e) =>
              formik.setFieldValue(
                "accountNumber",
                e.target.value.replace(/\D/g, "")
              )
            }
            className={getInputClasses("accountNumber")}
          />
        </div>

        {/* IFSC Code */}
        <div className="space-y-2">
          <Label className="font-medium">IFSC Code</Label>
          <Input
            name="ifscCode"
            value={formik.values.ifscCode}
            onChange={formik.handleChange}
            className={getInputClasses("ifscCode")}
          />
        </div>

        {/* Branch Name */}
        <div className="space-y-2">
          <Label className="font-medium">Branch Name</Label>
          <Input
            name="branchName"
            value={formik.values.branchName}
            onChange={formik.handleChange}
            className={getInputClasses("branchName")}
          />
        </div>

        {/* PAN Number */}
        <div className="space-y-2">
          <Label className="font-medium">PAN Number</Label>
          <Input
            name="bankPanNumber"
            value={formik.values.bankPanNumber}
            onChange={formik.handleChange}
            className={getInputClasses("bankPanNumber")}
          />
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* ================= LEGAL DOCUMENTS ================= */}
      <h3 className="text-lg font-semibold text-gray-500 mb-4">
        Legal Documents:
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Photo Upload */}
        <div className="space-y-2">
          <Label className="font-medium">Photo</Label>
          <div className="relative">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.currentTarget.files?.[0]
                formik.setFieldValue("photo", file)
              }}
              className={getUploadClasses("photo")}
            />
          </div>

          {formik.values.photo && (
            <p className="text-sm text-gray-500">
              Selected: {formik.values.photo.name}
            </p>
          )}
        </div>

        {/* Aadhaar Number */}
        <div className="space-y-2">
          <Label className="font-medium">Aadhaar Number</Label>
          <Input
            name="aadhaarNumber"
            value={formik.values.aadhaarNumber}
            onChange={(e) =>
              formik.setFieldValue(
                "aadhaarNumber",
                e.target.value.replace(/\D/g, "")
              )
            }
            className={getInputClasses("aadhaarNumber")}
          />
        </div>

        {/* PAN Card Number */}
        <div className="space-y-2">
          <Label className="font-medium">PAN Card Number</Label>
          <Input
            name="panCardNumber"
            value={formik.values.panCardNumber}
            onChange={formik.handleChange}
            className={getInputClasses("panCardNumber")}
          />
        </div>

        {/* Passport Number */}
        <div className="space-y-2">
          <Label className="font-medium">Passport Number</Label>
          <Input
            name="passportNumber"
            value={formik.values.passportNumber}
            onChange={formik.handleChange}
            className={getInputClasses("passportNumber")}
          />
        </div>

        {/* Driving License Number */}
        <div className="space-y-2">
          <Label className="font-medium">Driving License Number</Label>
          <Input
            name="drivingLicenseNumber"
            value={formik.values.drivingLicenseNumber}
            onChange={formik.handleChange}
            className={getInputClasses("drivingLicenseNumber")}
          />
        </div>

        {/* UAN */}
        <div className="space-y-2">
          <Label className="font-medium">UAN (EPFO)</Label>
          <Input
            name="uan"
            value={formik.values.uan}
            onChange={formik.handleChange}
            className={getInputClasses("uan")}
          />
        </div>

        {/* ESIC Number */}
        <div className="space-y-2">
          <Label className="font-medium">ESIC Number</Label>
          <Input
            name="esicNumber"
            value={formik.values.esicNumber}
            onChange={formik.handleChange}
            className={getInputClasses("esicNumber")}
          />
        </div>
      </div>
    </section>
  )
}
