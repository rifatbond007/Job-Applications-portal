import { Outlet } from "react-router";
import { PortalSidebar } from "../../components/PortalSidebar";
import { LayoutDashboard, Users, Briefcase, Brain, BarChart3, Settings } from "lucide-react";

const adminNavItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "User Management", path: "/admin/users", icon: Users },
  { label: "Job Listings", path: "/admin/jobs", icon: Briefcase },
  { label: "AI Monitor", path: "/admin/ai-monitor", icon: Brain },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <PortalSidebar
        title="Admin Portal"
        items={adminNavItems}
        accentColor="bg-orange-500"
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
