import "./globals.css";
import AppSidebar from "@/components/AppSidebar"
import AppNavbar from "@/components/AppNavbar"
import { Outfit } from "next/font/google"
import { Toaster } from "react-hot-toast"

const outfit = Outfit({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-50`}>
        <div className="flex">
          <div className="h-screen sticky top-0">
            <AppSidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <AppNavbar />
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>

        {/* react-hot-toast toaster */}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
