import { useState } from "react";
import { Link } from "react-router";
import { Briefcase, ChevronDown, User, Shield, LogIn } from "lucide-react";
import { Button } from "../ui/button";

export function LandingNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-xl text-gray-900 hover:text-blue-600 transition-colors"
          >
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span>JobTracker AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Find Jobs
            </Link>

            {/* Admin Portal Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("admin")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded px-2 py-1"
                aria-expanded={activeDropdown === "admin"}
                aria-haspopup="true"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "admin" && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Admin Dashboard</div>
                      <div className="text-xs text-gray-500">
                        System oversight & analytics
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                    to="/admin/users"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    User Management
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Job Listings Oversight
                  </Link>
                  <Link
                    to="/admin/ai-monitor"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    AI Usage Monitor
                  </Link>
                </div>
              )}
            </div>

            {/* Job Seeker Portal Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("job-seeker")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
                aria-expanded={activeDropdown === "job-seeker"}
                aria-haspopup="true"
              >
                <User className="h-4 w-4" />
                <span>Job Seeker</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "job-seeker" && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/job-seeker"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Job Seeker Dashboard</div>
                      <div className="text-xs text-gray-500">
                        Track applications & get AI help
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                    to="/job-seeker/applications"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    My Applications
                  </Link>
                  <Link
                    to="/job-seeker/resume"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Resume Manager
                  </Link>
                  <Link
                    to="/job-seeker/ai-assistant"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    AI Career Assistant
                  </Link>
                </div>
              )}
            </div>

            {/* Job Poster/Employer Portal Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("job-poster")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                aria-expanded={activeDropdown === "job-poster"}
                aria-haspopup="true"
              >
                <Briefcase className="h-4 w-4" />
                <span>Employers</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "job-poster" && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/job-poster"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Briefcase className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Employer Dashboard</div>
                      <div className="text-xs text-gray-500">
                        Post jobs & review candidates
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                    to="/job-poster/jobs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Job Listings
                  </Link>
                  <Link
                    to="/job-poster/candidates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Candidate Applications
                  </Link>
                  <Link
                    to="/job-poster/analytics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Hiring Analytics
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:flex">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
