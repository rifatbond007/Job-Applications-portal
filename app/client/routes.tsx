import { createBrowserRouter } from "react-router";

// Pages
import { Home } from "./pages/Home";

// Admin
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { JobListingsOversight } from "./pages/admin/JobListingsOversight";
import { AIUsageMonitor } from "./pages/admin/AIUsageMonitor";
import { SystemAnalytics } from "./pages/admin/SystemAnalytics";
import { AdminSettings } from "./pages/admin/AdminSettings";

// Job Seeker
import { JobSeekerLayout } from "./pages/job-seeker/JobSeekerLayout";
import { JobSeekerDashboard } from "./pages/job-seeker/JobSeekerDashboard";
import { Applications } from "./pages/job-seeker/Applications";
import { ResumeManager } from "./pages/job-seeker/ResumeManager";
import { AIAssistant } from "./pages/job-seeker/AIAssistant";
import { JobSeekerAnalytics } from "./pages/job-seeker/JobSeekerAnalytics";
import { JobSeekerSettings } from "./pages/job-seeker/JobSeekerSettings";

// Job Poster
import { JobPosterLayout } from "./pages/job-poster/JobPosterLayout";
import { JobPosterDashboard } from "./pages/job-poster/JobPosterDashboard";
import { JobListings } from "./pages/job-poster/JobListings";
import { CandidateApplications } from "./pages/job-poster/CandidateApplications";
import { ResumeViewer } from "./pages/job-poster/ResumeViewer";
import { JobPosterAnalytics } from "./pages/job-poster/JobPosterAnalytics";
import { JobPosterSettings } from "./pages/job-poster/JobPosterSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  // Admin Portal Routes
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "users", Component: UserManagement },
      { path: "jobs", Component: JobListingsOversight },
      { path: "ai-monitor", Component: AIUsageMonitor },
      { path: "analytics", Component: SystemAnalytics },
      { path: "settings", Component: AdminSettings },
    ],
  },
  // Job Seeker Portal Routes
  {
    path: "/job-seeker",
    Component: JobSeekerLayout,
    children: [
      { index: true, Component: JobSeekerDashboard },
      { path: "applications", Component: Applications },
      { path: "resume", Component: ResumeManager },
      { path: "ai-assistant", Component: AIAssistant },
      { path: "analytics", Component: JobSeekerAnalytics },
      { path: "settings", Component: JobSeekerSettings },
    ],
  },
  // Job Poster Portal Routes
  {
    path: "/job-poster",
    Component: JobPosterLayout,
    children: [
      { index: true, Component: JobPosterDashboard },
      { path: "jobs", Component: JobListings },
      { path: "candidates", Component: CandidateApplications },
      { path: "resumes", Component: ResumeViewer },
      { path: "analytics", Component: JobPosterAnalytics },
      { path: "settings", Component: JobPosterSettings },
    ],
  },
]);
