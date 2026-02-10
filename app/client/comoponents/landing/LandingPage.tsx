/**
 * Landing Page - Job Application Portal
 * 
 * A high-fidelity, production-ready landing page featuring:
 * - Hero section with value proposition and quick search
 * - Paginated job feed with advanced filtering
 * - Application sidebar with React Hook Form + Zod validation
 * - Status tracker for returning users
 * - Full accessibility (ARIA labels, keyboard navigation)
 * - Performance optimizations (memo, skeleton loaders)
 * - LocalStorage persistence for drafts and saved jobs
 * 
 * Architecture:
 * - Atomic Design: Separate atoms, molecules, and organisms
 * - Form Management: React Hook Form with Zod schema validation
 * - State Persistence: Draft applications and saved jobs in localStorage
 * - Performance: Memoized components, optimized re-renders
 * - Accessibility: Full keyboard navigation, ARIA labels, focus management
 */

import { useState, useEffect, useMemo } from "react";
import { Sparkles, TrendingUp, Shield, Zap, Briefcase } from "lucide-react";
import { LandingNavbar } from "./LandingNavbar";
import { SearchBar } from "./SearchBar";
import { JobCard } from "./JobCard";
import { JobCardSkeleton } from "./JobCardSkeleton";
import { ApplicationSidebar } from "./ApplicationSidebar";
import { StatusTracker } from "./StatusTracker";
import { Button } from "../ui/button";
import { EmptyState } from "../EmptyState";
import { MOCK_JOBS, type JobListing } from "../../data/mockJobs";

const ITEMS_PER_PAGE = 6;

export function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocationType, setSelectedLocationType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  // Mock user applications for status tracker
  const mockApplications = [
    {
      jobTitle: "Senior Frontend Engineer",
      company: "TechCorp Inc.",
      status: "interviewing" as const,
      appliedDate: "3 days ago",
      nextStep: "Technical interview on Feb 12",
    },
    {
      jobTitle: "Product Designer",
      company: "DesignHub",
      status: "reviewing" as const,
      appliedDate: "1 week ago",
    },
  ];

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter jobs based on search criteria
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "All Departments" ||
        job.department === selectedDepartment;

      const matchesLocationType =
        selectedLocationType === "All Types" ||
        job.locationType === selectedLocationType;

      return matchesSearch && matchesDepartment && matchesLocationType;
    });
  }, [searchTerm, selectedDepartment, selectedLocationType]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = () => {
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleApply = (jobId: string) => {
    const job = MOCK_JOBS.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsApplicationOpen(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm">AI-Powered Job Matching</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 max-w-4xl mx-auto">
              Find Your Dream Job with{" "}
              <span className="text-yellow-300">AI Assistance</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of job seekers and employers using our intelligent
              platform to make smarter hiring decisions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
              <div>
                <div className="text-4xl font-bold text-yellow-300">10K+</div>
                <div className="text-blue-200">Active Jobs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-300">50K+</div>
                <div className="text-blue-200">Job Seekers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-300">2K+</div>
                <div className="text-blue-200">Companies</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedLocationType={selectedLocationType}
            onLocationTypeChange={setSelectedLocationType}
            onSearch={handleSearch}
          />
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Matching</h3>
                <p className="text-sm text-gray-600">
                  Smart algorithms match you with perfect opportunities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">
                  Monitor your application status in real-time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Verified Employers</h3>
                <p className="text-sm text-gray-600">
                  All companies are verified for your safety
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {isLoading ? "Loading jobs..." : `${filteredJobs.length} Jobs Found`}
                </h2>
                <p className="text-gray-600 mt-1">
                  Browse through the best opportunities
                </p>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {isLoading ? (
                // Skeleton Loading
                <>
                  {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                    <JobCardSkeleton key={index} />
                  ))}
                </>
              ) : paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} />
                ))
              ) : (
                <EmptyState
                  icon={Zap}
                  title="No jobs found"
                  description="Try adjusting your search filters to find more opportunities"
                />
              )}
            </div>

            {/* Pagination */}
            {!isLoading && paginatedJobs.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </Button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1
                    ) {
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          onClick={() => handlePageChange(pageNum)}
                          className={
                            currentPage === pageNum
                              ? "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={currentPage === pageNum ? "page" : undefined}
                        >
                          {pageNum}
                        </Button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span key={pageNum} className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar - Status Tracker */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <StatusTracker applications={mockApplications} />
            </div>
          </div>
        </div>
      </section>

      {/* Application Sidebar */}
      <ApplicationSidebar
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        job={selectedJob}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-semibold">JobTracker AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                The most advanced AI-powered job application tracking platform.
                Find your dream job and manage your career journey with confidence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Browse Jobs</li>
                <li>Resume Manager</li>
                <li>AI Career Assistant</li>
                <li>Application Tracker</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Post Jobs</li>
                <li>Find Candidates</li>
                <li>AI Screening</li>
                <li>Analytics Dashboard</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 JobTracker AI. All rights reserved. Powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}