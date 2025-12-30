"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, User } from "lucide-react";
import { useState } from "react";

export default function ProfileSection() {
    const [imageUrl] = useState<string | null>(null);
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Card className="p-6 border bg-white">
                {/* Page Title */}
                <h2 className="text-xl font-semibold mb-4">Profile</h2>

                {/* ================= Profile Header Card ================= */}
                <Card className="mb-6 rounded-2xl shadow-sm border bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">

                            {/* Left: Profile Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            width={80}
                                            height={80}
                                            alt="profile"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User className="w-10 h-10 text-gray-500" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Ankush Lokhande</h3>
                                    <p className="text-sm text-gray-500">Team Manager</p>
                                    <p className="text-sm text-gray-500">Arizona, United States</p>
                                </div>
                            </div>

                            {/* Right: Social Icons + Edit */}
                            <div className="flex items-center gap-4">

                                <Button
                                    variant="outline"
                                    className="rounded-full flex items-center gap-2 text-blue-600 bg-blue-50 hover:text-blue-700 border-blue-200"
                                >
                                    <Pencil size={16} />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ================= Personal Information ================= */}
                <Card className="mb-6 rounded-2xl shadow-sm border bg-white">
                    <CardContent className="">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Personal Information</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">

                                    {/* First Name */}
                                    <div>
                                        <p className="text-xs text-gray-500">First Name</p>
                                        <p className="font-medium">Ankush</p>
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <p className="text-xs text-gray-500">Last Name</p>
                                        <p className="font-medium">Lokhande</p>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <p className="text-xs text-gray-500">Email address</p>
                                        <p className="font-medium">randomuser@pimjo.com</p>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <p className="font-medium">9956321455</p>
                                    </div>

                                    {/* Bio */}
                                    <div className="md:col-span-2">
                                        <p className="text-xs text-gray-500">Bio</p>
                                        <p className="font-medium">Team Manager</p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="rounded-full flex items-center gap-2 text-blue-600 bg-blue-50 hover:text-blue-700 border-blue-200"
                            >
                                <Pencil size={16} />
                                Edit
                            </Button>
                        </div>

                    </CardContent>
                </Card>

                {/* ================= Address Section ================= */}
                <Card className="rounded-2xl shadow-sm border bg-white">
                    <CardContent className="">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Address</h3>


                                </div>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">

                                    {/* Country */}
                                    <div>
                                        <p className="text-xs text-gray-500">Country</p>
                                        <p className="font-medium">United States</p>
                                    </div>

                                    {/* City / State */}
                                    <div>
                                        <p className="text-xs text-gray-500">City/State</p>
                                        <p className="font-medium">Phoenix, Arizona, United States.</p>
                                    </div>

                                    {/* Postal Code */}
                                    <div>
                                        <p className="text-xs text-gray-500">Postal Code</p>
                                        <p className="font-medium">ERT 2489</p>
                                    </div>

                                    {/* Tax ID */}
                                    <div>
                                        <p className="text-xs text-gray-500">TAX ID</p>
                                        <p className="font-medium">AS4568384</p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="rounded-full flex items-center gap-2 text-blue-600 bg-blue-50 hover:text-blue-700 border-blue-200"
                            >
                                <Pencil size={16} />
                                Edit
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </Card>
        </div>
    );
}
