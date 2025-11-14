"use client";

import GridShape from "@/components/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex">
      
      {/* LEFT SIDE → keep exactly the same */}
      <div className="w-1/2 flex items-center justify-center bg-white px-6">
        {children}
      </div>

      {/* RIGHT SIDE → converted full design */}
      <div className="w-1/2 bg-brand-950 bg-blue-900 text-white flex items-center justify-center px-10 relative">
        <div className="relative flex items-center justify-center z-10">
          
          {/* Grid Shape from original layout */}
          <GridShape />

          {/* Centered content (same as original design) */}
          <div className="flex flex-col items-center max-w-xs">

           <Link href="/" className="block mb-4">
                  <Image
                    width={231}
                    height={48}
                    src="/logo/auth-logo.svg"
                    alt="Logo"
                  />
                </Link>

            {/* Tagline text */}
            <p className="text-center text-gray-400 dark:text-white/60">
              Free and Open-Source Tailwind CSS Admin Dashboard Template
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
