"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  formik: any
}

export default function EducationDetails({ formik }: Props) {
  const getInputClasses = (fieldName: string) => {
    const hasValue = formik.values[fieldName as keyof typeof formik.values]
    return hasValue
      ? "h-11 bg-blue-50 text-blue-900 border-blue-300 focus:border-blue-500"
      : "h-11"
  }

  // helper for upload input style
  const getUploadClasses = () => {
    const hasFile = formik.values.educationDocument
    return hasFile
      ? "h-11 w-full text-sm text-blue-900 bg-blue-50 border border-blue-300 rounded-md cursor-pointer focus:outline-none file:h-full file:border-0 file:bg-blue-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
      : "h-11 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none file:h-full file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
  }

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-500 mb-4">
        Education & Qualification:
      </h3>

      <div className="grid grid-cols-2 gap-6">
        {/* Degree Type */}
        <div className="space-y-2">
          <Label className="font-medium">Type of Degree</Label>
          <Input
            name="degreeType"
            value={formik.values.degreeType}
            onChange={formik.handleChange}
            placeholder="UG / PG / Diploma / Certification"
            className={getInputClasses("degreeType")}
          />
        </div>

        {/* Course / Degree */}
        <div className="space-y-2">
          <Label className="font-medium">Course / Degree</Label>
          <Input
            name="courseDegree"
            value={formik.values.courseDegree}
            onChange={formik.handleChange}
            className={getInputClasses("courseDegree")}
          />
        </div>

        {/* University / Board */}
        <div className="space-y-2">
          <Label className="font-medium">University / Board</Label>
          <Input
            name="universityBoard"
            value={formik.values.universityBoard}
            onChange={formik.handleChange}
            className={getInputClasses("universityBoard")}
          />
        </div>

        {/* Year of Passing */}
        <div className="space-y-2">
          <Label className="font-medium">Year of Passing</Label>
          <Input
            name="yearOfPassing"
            value={formik.values.yearOfPassing}
            onChange={(e) =>
              formik.setFieldValue(
                "yearOfPassing",
                e.target.value.replace(/\D/g, "")
              )
            }
            placeholder="YYYY"
            className={getInputClasses("yearOfPassing")}
          />
        </div>

        {/* Percentage / Grade */}
        <div className="space-y-2">
          <Label className="font-medium">Percentage / Grade</Label>
          <Input
            name="percentageGrade"
            value={formik.values.percentageGrade}
            onChange={formik.handleChange}
            placeholder="e.g. 85% or A+"
            className={getInputClasses("percentageGrade")}
          />
        </div>

        {/* Upload Document */}
        <div className="space-y-2">
          <Label className="font-medium">Upload Document</Label>
          <div className="relative">
            <input
              type="file"
              name="educationDocument"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.currentTarget.files?.[0]
                formik.setFieldValue("educationDocument", file)
              }}
              className={getUploadClasses()}
            />
          </div>

          {formik.values.educationDocument && (
            <p className="text-sm text-gray-500">
              Selected: {formik.values.educationDocument.name}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
