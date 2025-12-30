"use client";

import AppSidebar from "@/components/AppSidebar";
import AppNavbar from "@/components/AppNavbar";
import Loader from "@/components/ui/loader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // -------------------------------------------------------
  // AUTH PAGES → FULL SCREEN LOADER (no sidebar/nav)
  // -------------------------------------------------------
  if (isAuthPage) {
    return (
      <div className="min-h-screen relative bg-gray-50">
        {pageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <Loader />
          </div>
        )}

        {!pageLoading && children}
      </div>
    );
  }

  // NORMAL PAGES → SIDEBAR + NAVBAR + MAIN LOADER
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen sticky top-0">
        <AppSidebar />
      </div>

      {/* Navbar + Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AppNavbar />

        <main className="relative p-6 min-h-[calc(100vh-64px)]">
          {pageLoading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
              <Loader />
            </div>
          )}

          {!pageLoading && children}
        </main>
      </div>
    </div>
  );
}
