"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  formik: any
}

export default function AdditionalInfo({ formik }: Props) {
  const getInputClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  return (
    <section>
      {/* ================= ADDRESS DETAILS ================= */}
      <h3 className="text-lg font-semibold text-gray-500 mb-4">Address Details:</h3>

      {/* -------- Local Address -------- */}
      <div className="mb-4">
        <h4 className="font-medium mb-3">Local Address</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-medium">Address Line</Label>
            <Input
              name="localAddressLine"
              value={formik.values.localAddressLine}
              onChange={formik.handleChange}
              className={getInputClasses("localAddressLine")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">City</Label>
            <Input
              name="localCity"
              value={formik.values.localCity}
              onChange={formik.handleChange}
              className={getInputClasses("localCity")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">State</Label>
            <Input
              name="localState"
              value={formik.values.localState}
              onChange={formik.handleChange}
              className={getInputClasses("localState")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Pincode</Label>
            <Input
              name="localPincode"
              value={formik.values.localPincode}
              onChange={(e) =>
                formik.setFieldValue(
                  "localPincode",
                  e.target.value.replace(/\D/g, "")
                )
              }
              className={getInputClasses("localPincode")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Country</Label>
            <Input
              name="localCountry"
              value={formik.values.localCountry}
              onChange={formik.handleChange}
              className={getInputClasses("localCountry")}
            />
          </div>
        </div>
      </div>

      {/* -------- Residential Address -------- */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <input
            type="checkbox"
            id="sameAsLocal"
            checked={formik.values.sameAsLocal}
            onChange={(e) =>
              formik.setFieldValue("sameAsLocal", e.target.checked)
            }
            className="w-4 h-4 accent-blue-600"
          />
          <label
            htmlFor="sameAsLocal"
            className="text-sm cursor-pointer select-none"
          >
            Residential Address same as Local Address
          </label>
        </div>

        <h4 className="font-medium mb-3">Residential Address</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-medium">Address Line</Label>
            <Input
              name="residentialAddressLine"
              value={formik.values.residentialAddressLine}
              onChange={formik.handleChange}
              className={getInputClasses("residentialAddressLine")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">City</Label>
            <Input
              name="residentialCity"
              value={formik.values.residentialCity}
              onChange={formik.handleChange}
              className={getInputClasses("residentialCity")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">State</Label>
            <Input
              name="residentialState"
              value={formik.values.residentialState}
              onChange={formik.handleChange}
              className={getInputClasses("residentialState")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Pincode</Label>
            <Input
              name="residentialPincode"
              value={formik.values.residentialPincode}
              onChange={(e) =>
                formik.setFieldValue(
                  "residentialPincode",
                  e.target.value.replace(/\D/g, "")
                )
              }
              className={getInputClasses("residentialPincode")}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Country</Label>
            <Input
              name="residentialCountry"
              value={formik.values.residentialCountry}
              onChange={formik.handleChange}
              className={getInputClasses("residentialCountry")}
            />
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* ================= EMERGENCY CONTACT ================= */}
      <h3 className="text-lg font-semibold text-gray-500 mb-4">
        Emergency Contact Information:
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="font-medium">Contact Person Name</Label>
          <Input
            name="emergencyContactName"
            value={formik.values.emergencyContactName}
            onChange={formik.handleChange}
            className={getInputClasses("emergencyContactName")}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Relationship</Label>
          <Input
            name="emergencyRelationship"
            value={formik.values.emergencyRelationship}
            onChange={formik.handleChange}
            className={getInputClasses("emergencyRelationship")}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Mobile Number</Label>
          <Input
            name="emergencyMobile"
            value={formik.values.emergencyMobile}
            onChange={(e) =>
              formik.setFieldValue(
                "emergencyMobile",
                e.target.value.replace(/\D/g, "")
              )
            }
            className={getInputClasses("emergencyMobile")}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Alternate Contact Number</Label>
          <Input
            name="emergencyAlternateNumber"
            value={formik.values.emergencyAlternateNumber}
            onChange={(e) =>
              formik.setFieldValue(
                "emergencyAlternateNumber",
                e.target.value.replace(/\D/g, "")
              )
            }
            className={getInputClasses("emergencyAlternateNumber")}
          />
        </div>

        <div className="space-y-2 col-span-2">
          <Label className="font-medium">Address</Label>
          <Input
            name="emergencyAddress"
            value={formik.values.emergencyAddress}
            onChange={formik.handleChange}
            className={getInputClasses("emergencyAddress")}
          />
        </div>
      </div>
    </section>
  )
}
