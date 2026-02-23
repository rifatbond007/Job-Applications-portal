import { useState, useEffect, useMemo } from "react";
import { Sparkles, Zap, Briefcase, ChevronRight, Cpu } from "lucide-react";
import { LandingNavbar } from "./LandingNavbar";
import { SearchBar } from "./SearchBar";
import { JobCard } from "./JobCard";
import { JobCardSkeleton } from "./JobCardSkeleton";
import { ApplicationSidebar } from "./ApplicationSidebar";
import { StatusTracker } from "./StatusTracker";
import { Button } from "../ui/button";
import { EmptyState } from "../EmptyState";
import { MOCK_JOBS, type JobListing } from "../../data/mockJobs";
import { cn } from "@/lib/utils";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import { getLocalStorageItem, LocalStorageKeys } from "../../utils/localStorage";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 6;

function mapApiJobToListing(j: { id: string; title: string; companyName: string; location: string; salary: number | null; createdAt: string }): JobListing {
  const sal = j.salary ?? 0;
  return {
    id: j.id,
    title: j.title,
    company: j.companyName,
    location: j.location || "Remote",
    locationType: "Remote",
    department: "General",
    salary: { min: sal, max: sal || 0, currency: "USD" },
    isNew: true,
    description: "",
    requirements: [],
    postedDate: j.createdAt,
  };
}

export function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocationType, setSelectedLocationType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [apiJobs, setApiJobs] = useState<JobListing[]>([]);
  const { user } = useAuth();
  const token = getLocalStorageItem<string | null>(LocalStorageKeys.TOKEN, null);
  const isCandidate = !!token && user?.role === "CANDIDATE";

  const mockApplications = [
    { jobTitle: "Senior Frontend Engineer", company: "TechCorp Inc.", status: "interviewing" as const, appliedDate: "3 days ago", nextStep: "Technical interview on Feb 12" },
    { jobTitle: "Product Designer", company: "DesignHub", status: "reviewing" as const, appliedDate: "1 week ago" },
  ];

  useEffect(() => {
    api.get<{ content: unknown[] }>("/jobs?page=0&size=50").then(({ data }) => {
      const content = data.content ?? [];
      const list = content.map((j: any) => mapApiJobToListing({
        id: j.id,
        title: j.title,
        companyName: j.companyName,
        location: j.location,
        salary: j.salary,
        createdAt: j.createdAt,
      }));
      setApiJobs(list);
    }).catch(() => setApiJobs([]));
  }, []);

  const allJobs = useMemo(() => (apiJobs.length > 0 ? apiJobs : MOCK_JOBS), [apiJobs]);

  useEffect(() => {
    const t = apiJobs.length > 0 ? 0 : 1000;
    const timer = setTimeout(() => setIsLoading(false), t);
    return () => clearTimeout(timer);
  }, [apiJobs.length]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch = searchTerm === "" || [job.title, job.company, job.description].some((field) => String(field).toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment;
      const matchesLocationType = selectedLocationType === "All Types" || job.locationType === selectedLocationType;
      return matchesSearch && matchesDepartment && matchesLocationType;
    });
  }, [allJobs, searchTerm, selectedDepartment, selectedLocationType]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearch = () => {
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      document.getElementById("job-feed")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleApply = async (jobId: string) => {
    const job = allJobs.find((j) => j.id === jobId);
    if (!job) return;
    if (isCandidate) {
      try {
        await api.post(`/applications/jobs/${jobId}/apply`);
        toast.success("Application submitted.");
      } catch (err: any) {
        const msg = err.response?.data?.message ?? "Apply failed";
        toast.error(msg);
      }
      return;
    }
    setSelectedJob(job);
    setIsApplicationOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('job-feed')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-indigo-100">
      <LandingNavbar />

      {/* FULL SCREEN HERO: 100vh */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">v2.0 Career Engine Live</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-[0.95] mb-8">
            The intelligent way <br />
            <span className="text-slate-300">to land your next </span>
            <span className="relative">
              big role.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6C50 2 150 2 198 6" stroke="#020617" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium">
            Stop searching, start matching. Our algorithmic feed prioritizes roles based on your verified skills and actual career growth potential.
          </p>

          {/* Centered Search Integration with shadow for depth */}
          <div className="w-full max-w-4xl mx-auto p-1 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/40 scale-100 md:scale-105">
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

          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-950">Explore Jobs</span>
            <div className="w-px h-12 bg-gradient-to-b from-slate-950 to-transparent" />
          </div>
        </div>
      </section>

      {/* Content Feed with Left-Aligned Sidebar Layout */}
      <main id="job-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT SIDEBAR: Tracker & Navigation */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Dashboard</h4>
                <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                  <StatusTracker applications={mockApplications} />
                </div>
              </div>

              <div className="p-8 bg-slate-950 rounded-[2rem] text-white shadow-xl shadow-slate-200 group relative overflow-hidden">
                <div className="relative z-10">
                  <Cpu className="h-8 w-8 mb-4 text-slate-400" />
                  <h4 className="text-lg font-bold mb-2">Skill Analysis</h4>
                  <p className="text-slate-400 text-xs mb-6 leading-relaxed">Let AI scan your LinkedIn profile to find hidden opportunities.</p>
                  <Button className="w-full bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-xl border-none text-xs h-10">Run Scan</Button>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN LISTINGS */}
          <div className="flex-1 space-y-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                   Recent Openings
                </h2>
                <div className="h-px w-12 bg-slate-200" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredJobs.length} Results</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <JobCardSkeleton key={i} />)
              ) : paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => <JobCard key={job.id} job={job} onApply={handleApply} />)
              ) : (
                <EmptyState icon={Zap} title="Nothing found" description="Try removing some filters to see more results." />
              )}
            </div>

            {/* Pagination */}
            {!isLoading && paginatedJobs.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-between pt-12 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page {currentPage} of {totalPages}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className="rounded-xl font-bold text-slate-600 h-10 px-6"
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    className="rounded-xl font-bold text-slate-600 h-10 px-6"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <ApplicationSidebar isOpen={isApplicationOpen} onClose={() => setIsApplicationOpen(false)} job={selectedJob} />

      {/* MINIMAL FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <span className="font-black tracking-tighter text-xl text-slate-950">JobTracker</span>
          </div>
          
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <span className="hover:text-slate-950 cursor-pointer transition-colors">Platform</span>
            <span className="hover:text-slate-950 cursor-pointer transition-colors">Company</span>
            <span className="hover:text-slate-950 cursor-pointer transition-colors">Resources</span>
          </div>

          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">© 2026 GLOBAL TECH PARTNERS</p>
        </div>
      </footer>
    </div>
  );
}