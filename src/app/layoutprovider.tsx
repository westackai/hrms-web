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

  const isLoginPage = pathname === "/login";
   const isSignUpPage = pathname === "/signup";

  // --- LOGIN PAGE: No sidebar, no navbar ---
  if (isLoginPage || isSignUpPage) {
    return <>{children}</>;
  }

  // --- NORMAL PAGES ---
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen sticky top-0">
        <AppSidebar />
      </div>

      {/* Navbar + Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AppNavbar />

        <main className="p-6 relative min-h-[calc(100vh-64px)]">
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
