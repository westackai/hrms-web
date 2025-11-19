"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SalarySlip() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white border rounded-xl shadow-md print:w-full print:shadow-none print:border-none border-gray-300">

      {/* Company Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <Image
          src="/logo_with_name.png"  // <-- replace with actual logo
          alt="Company Logo"
          width={70}
          height={70}
          className="mb-2"
        />
        <h1 className="text-2xl font-bold text-gray-800">WeStack Solutions</h1>
        <p className="text-gray-500 text-sm"> Scheme No 140, Indore, Madhya Pradesh, India</p>
        <p className="text-gray-500 text-sm">Email: hr@technova.com | Phone: +91 9876543210</p>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-blue-700">
            Monthly Salary Slip
          </CardTitle>
          <p className="text-center text-sm text-gray-600">January 2025</p>
        </CardHeader>

        <CardContent>
          {/* Employee + Salary Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="font-semibold mb-1 text-gray-700">Employee Details</h2>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Employee ID:</strong> EMP102</p>
              <p><strong>PAN:</strong> ABCDE1234F</p>
              <p><strong>Department:</strong> Development</p>
            </div>

            <div>
              <h2 className="font-semibold mb-1 text-gray-700">Bank Details</h2>
              <p><strong>Bank:</strong> SBI Bank</p>
              <p><strong>Account No:</strong> XXXX XXXX 1234</p>
              <p><strong>IFSC:</strong> SBIN0000456</p>
              <p><strong>Payment Mode:</strong> Bank Transfer</p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Earnings Section */}
          <h2 className="font-semibold mb-2 text-gray-700 text-lg">Earnings</h2>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span>Basic Salary</span> <span>₹30,000</span>
            </p>
            <p className="flex justify-between">
              <span>House Rent Allowance (HRA)</span> <span>₹8,000</span>
            </p>
            <p className="flex justify-between">
              <span>Medical Allowance</span> <span>₹2,000</span>
            </p>

            <p className="flex justify-between font-semibold text-blue-700 border-t pt-2 mt-2">
              <span>Total Earnings</span> <span>₹40,000</span>
            </p>
          </div>

          <Separator className="my-4" />

          {/* Deductions Section */}
          <h2 className="font-semibold mb-2 text-gray-700 text-lg">Deductions</h2>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span>Provident Fund (PF)</span> <span>₹1,800</span>
            </p>

            <p className="flex justify-between">
              <span>Professional Tax</span> <span>₹200</span>
            </p>

            <p className="flex justify-between font-semibold text-red-600 border-t pt-2 mt-2">
              <span>Total Deductions</span> <span>₹2,000</span>
            </p>
          </div>

          <Separator className="my-4" />

          {/* Net Salary */}
          <div className="text-lg font-bold text-green-700 flex justify-between items-center bg-green-50 px-4 py-3 rounded-lg border border-green-200 shadow-sm">
            <span>Net Salary (In-Hand)</span>
            <span>₹38,000</span>
          </div>

          {/* Note */}
          <div className="text-xs text-gray-500 mt-4 text-center italic">
            This is a system-generated salary slip and does not require a signature.
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <div className="flex justify-center mt-4 print:hidden">
        <Button onClick={() => window.print()} className="px-6">
          Download Slip
        </Button>
      </div>
    </div>
  );
}
