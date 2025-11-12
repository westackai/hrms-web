"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Users2, Menu, Building2 } from "lucide-react"
import clsx from "clsx"

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        "border-r border-gray-200 h-screen bg-white flex flex-col shadow-sm transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[290px]"
      )}
    >
      {/* ====== Header ====== */}
      <div className="h-[64px] flex items-center gap-3 px-5">
        <Menu
          className="w-6 h-6 text-black opacity-70 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        />
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-lg"></div>
            <p className="font-semibold text-black text-[18px]">PAYROLL</p>
          </div>
        )}
      </div>

      {/* ====== Sidebar Links ====== */}
      <div className="mt-5 px-3">
        {/* DASHBOARD */}
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className={clsx(
              "w-full justify-start flex gap-3 rounded-lg",
              collapsed && "justify-center",
              pathname === "/dashboard"
                ? "bg-blue-100 text-blue-600 hover:bg-gray-100"
                : " hover:bg-gray-100"
            )}
          >
            <LayoutGrid className="w-6 h-6" />
            {!collapsed && "Dashboard"}
          </Button>
        </Link>

        {/* ORGANIZATION */}
        <Accordion type="single" collapsible className="mt-3 space-y-1">
          <AccordionItem value="organization">
            <AccordionTrigger
              className={clsx(
                "rounded-lg px-3 py-2 !no-underline hover:no-underline text-sm",
                collapsed && "px-0 justify-center [&>svg:last-child]:hidden",
                pathname.startsWith("/organization")
                  ? "bg-blue-50 text-indigo-500"
                  : ""
              )}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                {!collapsed && "Organization"}
              </div>
            </AccordionTrigger>

            {!collapsed && (
              <AccordionContent className="pl-11 pt-2 flex flex-col gap-2 text-sm">
                <Link href="/organization/branch">
                  <Button
                    variant="ghost"
                    className={clsx(
                      "justify-start w-full",
                      pathname === "/organization/branch"
                        ? "text-indigo-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Branch
                  </Button>
                </Link>

                <Link href="/organization/departments">
                  <Button
                    variant="ghost"
                    className={clsx(
                      "justify-start w-full",
                      pathname === "/organization/departments"
                        ? "text-indigo-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Department
                  </Button>
                </Link>

                <Link href="/organization/designations">
                  <Button
                    variant="ghost"
                    className={clsx(
                      "justify-start w-full",
                      pathname === "/organization/designations"
                        ? "text-indigo-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Designation
                  </Button>
                </Link>

                <Link href="/organization/shift">
                  <Button
                    variant="ghost"
                    className={clsx(
                      "justify-start w-full",
                      pathname === "/organization/shift"
                        ? "text-indigo-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Shift
                  </Button>
                </Link>

                <Link href="/organization/employment-type">
                  <Button
                    variant="ghost"
                    className={clsx(
                      "justify-start w-full",
                      pathname === "/organization/employment-type"
                        ? "text-indigo-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Employment Type
                  </Button>
                </Link>
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>

        {/* EMPLOYEES */}
        <Link href="/employees">
          <Button
            variant="ghost"
            className={clsx(
              "w-full justify-start flex gap-3 rounded-lg mt-2",
              collapsed && "justify-center",
              pathname.startsWith("/employees")
                ? "bg-blue-50 text-indigo-500"
                : "hover:bg-gray-100"
            )}
          >
            <Users2 className="w-6 h-6" />
            {!collapsed && "Employees"}
          </Button>
        </Link>
      </div>
    </div>
  )
}
