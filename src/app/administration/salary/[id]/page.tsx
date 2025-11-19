"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// same employee data
const employees = [
  { id: 11, name: "Divya Sohani", img: "https://randomuser.me/api/portraits/women/65.jpg", designation: "AI/Automation Developer", category: "Staff Payday", salary: 120000, payday: "28 February 2025", status: "success" },
  { id: 10, name: "Deepak Mishra", img: "https://randomuser.me/api/portraits/men/76.jpg", designation: "Full Stack Developer", category: "Staff Payday", salary: 90000, payday: "28 February 2025", status: "success" },
  { id: 9, name: "Rajat Saraswat", img: "https://randomuser.me/api/portraits/men/14.jpg", designation: "Full Stack Developer", category: "Member Payday", salary: 85000, payday: "28 February 2025", status: "pending" },
  { id: 8, name: "Utkarsh Nagnath Gaikwad", img: "https://randomuser.me/api/portraits/men/91.jpg", designation: "Frontend Developer", category: "Staff Payday", salary: 75000, payday: "28 February 2025", status: "hold" },
  { id: 7, name: "Nitin Chouhan", img: "https://randomuser.me/api/portraits/men/54.jpg", designation: "Backend Developer", category: "Member Payday", salary: 80000, payday: "28 February 2025", status: "success" },
  { id: 6, name: "Nitin Batham", img: "https://randomuser.me/api/portraits/men/33.jpg", designation: "Business Development Executive", category: "Part-Time Payday", salary: 45000, payday: "28 February 2025", status: "hold" },
  { id: 5, name: "Mohit Rathore", img: "https://randomuser.me/api/portraits/men/19.jpg", designation: "Backend Developer", category: "Member Payday", salary: 82000, payday: "28 February 2025", status: "pending" },
  { id: 4, name: "Kanha Choubey", img: "https://randomuser.me/api/portraits/women/29.jpg", designation: "Frontend Developer", category: "Staff Payday", salary: 70000, payday: "28 February 2025", status: "success" },
  { id: 2, name: "Abhishekh Ojha", img: "https://randomuser.me/api/portraits/men/81.jpg", designation: "Frontend Developer", category: "Part-Time Payday", salary: 50000, payday: "28 February 2025", status: "hold" },
]

const statusMap: any = {
  success: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  pending: "bg-orange-100 text-orange-700 border border-orange-200",
  hold: "bg-gray-200 text-gray-700 border border-gray-300",
}

export default function PaymentDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const employeeId = Number(params.id)
  const emp = employees.find((e) => e.id === employeeId)

  if (!emp) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Payment Not Found</h2>
        <Button className="mt-4" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Details</h1>
        <Button variant="outline" className="border-gray-300" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="shadow-sm border border-gray-300 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-gray-200">
              <AvatarImage src={emp.img} />
              <AvatarFallback>{emp.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{emp.name}</p>
              <p className="text-sm text-gray-500">{emp.designation}</p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">

          {/* PAYMENT INFO */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Payday</p>
              <p className="font-medium">{emp.payday}</p>
            </div>

            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-medium">{emp.category}</p>
            </div>

            <div>
              <p className="text-gray-500">Payment Amount</p>
              <p className="text-lg font-semibold text-green-700">
                ₹ {emp.salary.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <Badge className={`rounded-full px-3 py-1 text-xs ${statusMap[emp.status]}`}>
                {emp.status === "success"
                  ? "Payment Success"
                  : emp.status === "pending"
                  ? "Pending Payment"
                  : "On Hold Payment"}
              </Badge>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <Button className="bg-indigo-600 text-white">Download Slip</Button>
        <Button variant="destructive">Cancel Payment</Button>
      </div>

    </div>
  )
}
