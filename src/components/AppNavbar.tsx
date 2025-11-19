"use client"

import { Bell, ChevronDown, LogOut, Settings, User, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loader from "./ui/loader"

export default function AppNavbar() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    router.push("/login");
  };

  const notifications = [
    {
      id: 1,
      name: 'Terry Franci',
      action: 'requests permission to change',
      project: 'Project - Nganfer App',
      category: 'Project',
      time: '5 min ago',
      avatar: '/user.png',
      online: true
    },
    {
      id: 2,
      name: 'Alena Franci',
      action: 'requests permission to change',
      project: 'Project - Nganfer App',
      category: 'Project',
      time: '8 min ago',
      avatar: '/user.png',
      online: true
    },
    {
      id: 3,
      name: 'Jocelyn Kenter',
      action: 'requests permission to change',
      project: 'Project - Nganfer App',
      category: 'Project',
      time: '15 min ago',
      avatar: '/user.png',
      online: true
    },
    {
      id: 4,
      name: 'Brandon Philips',
      action: 'requests permission to change',
      project: 'Project - Nganfer App',
      category: 'Project',
      time: '1 hr ago',
      avatar: '/user.png',
      online: false
    }
  ];

  return (
    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
      
      <div className="flex items-center gap-1 text-gray-500 font-medium text-md">
        WESTACK SOLUTIONS LLP
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>

      <div className="flex items-center gap-6">
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-[440px] rounded-2xl p-0 mt-5 border shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Notification</h2>
            </div>

            <div className="max-h-[420px] overflow-y-auto scrollbar-hide " style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex gap-3.5">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>{notification.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          notification.online ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-900">
                          {notification.name}
                        </span>{' '}
                        <span className="text-gray-500">{notification.action}</span>{' '}
                        <span className="font-semibold text-gray-900">
                          {notification.project}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium text-gray-500">
                          {notification.category}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-400">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 py-2">
                View All Notifications
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="h-6 w-px bg-gray-300"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-8 w-8 border">
                {/* use your image */}
                <AvatarImage src="/user.png" /> 
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">
                Ankush Lokhande
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-4 rounded-2xl shadow-xl border bg-white mt-5">
            {/* profile top */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/user.png" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm text-gray-900">Ankush Lokhande</p>
                <p className="text-xs text-gray-500">randomuser@pimjo.com</p>
              </div>
            </div>

            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50">
                <User className="h-4 w-4 mr-2 text-gray-600" /> Edit profile
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2 text-gray-600" /> Account settings
              </DropdownMenuItem>
              
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-3"/>

            <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-red-50 text-red-600" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2"/> Sign out
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {loading && <Loader />}
    </div>
  );
}