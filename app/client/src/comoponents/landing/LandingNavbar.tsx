import { useState } from "react";
import { Link } from "react-router";
import { 
  Briefcase, 
  ChevronDown, 
  User, 
  Shield, 
  LogIn, 
  LayoutDashboard, 
  FileText, 
  Zap, 
  Users, 
  BarChart3 
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"; // Assuming you have a utility for tailwind classes

export function LandingNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    {
      id: "job-seeker",
      label: "For Job Seekers",
      icon: <User className="h-4 w-4" />,
      items: [
        { title: "Dashboard", sub: "Track your progress", href: "/job-seeker", icon: <LayoutDashboard className="h-4 w-4" /> },
        { title: "Resume Manager", sub: "AI-optimized CVs", href: "/job-seeker/resume", icon: <FileText className="h-4 w-4" /> },
        { title: "AI Assistant", sub: "Interview coaching", href: "/job-seeker/ai-assistant", icon: <Zap className="h-4 w-4" /> },
      ]
    },
    {
      id: "job-poster",
      label: "For Employers",
      icon: <Briefcase className="h-4 w-4" />,
      items: [
        { title: "Employer Hub", sub: "Manage your hiring", href: "/job-poster", icon: <LayoutDashboard className="h-4 w-4" /> },
        { title: "Candidates", sub: "Review applications", href: "/job-poster/candidates", icon: <Users className="h-4 w-4" /> },
        { title: "Analytics", sub: "Data-driven hiring", href: "/job-poster/analytics", icon: <BarChart3 className="h-4 w-4" /> },
      ]
    },
    {
      id: "admin",
      label: "Admin",
      icon: <Shield className="h-4 w-4" />,
      items: [
        { title: "System Monitor", sub: "Global oversight", href: "/admin", icon: <Shield className="h-4 w-4" /> },
        { title: "AI Usage", sub: "Resource monitoring", href: "/admin/ai-monitor", icon: <Zap className="h-4 w-4" /> },
      ]
    }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              JobTracker<span className="text-indigo-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/jobs" className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-3 py-2 transition-colors">
              Find Jobs
            </Link>

            {navLinks.map((menu) => (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-md transition-all",
                    activeDropdown === menu.id ? "text-indigo-600 bg-slate-50" : "text-slate-600 hover:text-indigo-600"
                  )}
                >
                  {menu.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", activeDropdown === menu.id && "rotate-180")} />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === menu.id && (
                  <div className="absolute top-full left-0 pt-2 w-64 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden p-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="mt-0.5 text-slate-400 group-hover:text-indigo-600">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                            <div className="text-xs text-slate-500 leading-snug">{item.sub}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-600 hover:text-indigo-600">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 px-5">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}