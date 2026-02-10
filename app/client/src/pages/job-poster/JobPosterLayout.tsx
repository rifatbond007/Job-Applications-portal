import { Outlet } from "react-router";
import { PortalSidebar } from "../../comoponents/PortalSidebar";
import { LayoutDashboard, Briefcase, Users, FileText, BarChart3, Settings } from "lucide-react";

const jobPosterNavItems = [
  { label: "Dashboard", path: "/job-poster", icon: LayoutDashboard },
  { label: "Job Listings", path: "/job-poster/jobs", icon: Briefcase },
  { label: "Candidates", path: "/job-poster/candidates", icon: Users },
  { label: "Resume Viewer", path: "/job-poster/resumes", icon: FileText },
  { label: "Analytics", path: "/job-poster/analytics", icon: BarChart3 },
  { label: "Settings", path: "/job-poster/settings", icon: Settings },
];

export function JobPosterLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <PortalSidebar
        title="Employer Portal"
        items={jobPosterNavItems}
        accentColor="bg-blue-500"
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
