"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Users2, Menu, Building2, Settings2 } from "lucide-react"
import clsx from "clsx"

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Helper to check if a route is active
  const isActive = (route: string) => pathname === route || pathname.startsWith(route + "/")

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
            <img
              src="/logo_with_name.png"
              alt="WESTACK.ai Logo"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <Link href="/dashboard">
              <p className="font-semibold text-black text-[18px]">WESTACK.ai</p>
            </Link>
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
              isActive("/dashboard")
                ? "bg-blue-100 text-blue-600 hover:bg-gray-100"
                : " hover:bg-gray-100"
            )}
          >
            <LayoutGrid className="w-6 h-6" />
            {!collapsed && "Dashboard"}
          </Button>
        </Link>

        {/* ===== CONFIGURATION ===== */}
        <Accordion type="single" collapsible className="mt-3 space-y-1">
          <AccordionItem value="configuration">
            <AccordionTrigger
              className={clsx(
                "rounded-lg px-3 py-2 !no-underline hover:no-underline text-sm",
                collapsed && "px-0 justify-center [&>svg:last-child]:hidden",
                pathname.startsWith("/configuration")
                  ? "bg-blue-50 text-indigo-500"
                  : ""
              )}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                {!collapsed && "Configuration"}
              </div>
            </AccordionTrigger>

            {!collapsed && (
              <AccordionContent className="pl-11 pt-2 flex flex-col gap-2 text-sm">

                {[
                  { href: "/configuration/branch", label: "Branch" },
                  { href: "/configuration/departments", label: "Department" },
                  { href: "/configuration/designations", label: "Designation" },
                  { href: "/configuration/shift", label: "Shift" },
                  { href: "/configuration/employment-type", label: "Employment Type" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={clsx(
                        "justify-start w-full",
                        isActive(item.href)
                          ? "text-indigo-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}

              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>

        {/* ===== ADMINISTRATION ===== */}
        <Accordion type="single" collapsible className="mt-3 space-y-1">
          <AccordionItem value="administration">
            <AccordionTrigger
              className={clsx(
                "rounded-lg px-3 py-2 !no-underline hover:no-underline text-sm",
                collapsed && "px-0 justify-center [&>svg:last-child]:hidden",
                pathname.startsWith("/administration")
                  ? "bg-blue-50 text-indigo-500"
                  : ""
              )}
            >
              <div className="flex items-center gap-3">
                <Settings2 className="w-5 h-5" />
                {!collapsed && "Administration"}
              </div>
            </AccordionTrigger>

            {!collapsed && (
              <AccordionContent className="pl-11 pt-2 flex flex-col gap-2 text-sm">

                <Link href="/administration/employees">
                  <Button
                    variant="ghost"
                    className={clsx(
                      "justify-start w-full",
                      isActive("/administration/employees")
                        ? "text-indigo-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    Employees
                  </Button>
                </Link>

              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>

      </div>
    </div>
  )
}
