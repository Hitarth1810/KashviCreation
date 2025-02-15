"use client";
import { useState } from "react";
import { DashboardNav } from "@/app/components/dashboard-nav";
import { Menu } from "lucide-react";
import type React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to close sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with Toggle */}
      <div className={`fixed inset-y-0 left-0 z-40 md:relative md:w-64 bg-muted transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <DashboardNav closeSidebar={closeSidebar} /> {/* Pass closeSidebar function */}
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Mobile Menu Button */}
        <button
          className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-gray-800 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        {children}
      </main>
    </div>
  );
}
