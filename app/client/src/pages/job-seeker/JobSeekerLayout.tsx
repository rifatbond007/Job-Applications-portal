import { Outlet } from "react-router";
import { PortalSidebar } from "../../comoponents/PortalSidebar";
import { LayoutDashboard, FileText, FileCheck, Brain, BarChart3, Settings } from "lucide-react";

const jobSeekerNavItems = [
  { label: "Dashboard", path: "/job-seeker", icon: LayoutDashboard },
  { label: "Applications", path: "/job-seeker/applications", icon: FileText },
  { label: "Resume Manager", path: "/job-seeker/resume", icon: FileCheck },
  { label: "AI Assistant", path: "/job-seeker/ai-assistant", icon: Brain },
  { label: "Analytics", path: "/job-seeker/analytics", icon: BarChart3 },
  { label: "Settings", path: "/job-seeker/settings", icon: Settings },
];

export function JobSeekerLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <PortalSidebar
        title="Job Seeker"
        items={jobSeekerNavItems}
        accentColor="bg-green-500"
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
