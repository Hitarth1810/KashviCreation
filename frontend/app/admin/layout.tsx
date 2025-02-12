import { DashboardNav } from "@/app/components/dashboard-nav";
import type React from "react";



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav /> {/* Keep the admin navigation */}
      <main className="flex-1 overflow-y-auto">{children}</main> {/* No Navbar or Footer */}
    </div>
  );
}
