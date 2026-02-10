import { memo, useState, useEffect } from "react";
import { MapPin, Bookmark, DollarSign, Briefcase, Clock, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { JobListing } from "../../data/mockJobs";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: JobListing;
  onApply: (jobId: string) => void;
}

export const JobCard = memo(function JobCard({ job, onApply }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setIsSaved(savedJobs.includes(job.id));
  }, [job.id]);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering card click if you add one later
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    let updatedSavedJobs: string[];

    if (isSaved) {
      updatedSavedJobs = savedJobs.filter((id: string) => id !== job.id);
    } else {
      updatedSavedJobs = [...savedJobs, job.id];
    }

    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    setIsSaved(!isSaved);
  };

  const timeAgo = formatDistanceToNow(new Date(job.postedDate), { addSuffix: true });

  return (
    <article
      className={cn(
        "group relative bg-white rounded-[2rem] border p-6 md:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1",
        job.featured 
          ? "border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30" 
          : "border-slate-100 hover:border-indigo-200"
      )}
    >
      {/* Featured Badge floating on top */}
      {job.featured && (
        <div className="absolute -top-3 left-8 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-indigo-200">
          Featured Partner
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Company Logo Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-white group-hover:border-indigo-100 transition-all duration-500">
            <BuildingIcon companyName={job.company} />
          </div>
        </div>

        <div className="flex-1">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>
                {job.isNew && (
                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter border border-emerald-100">
                    <Zap className="h-3 w-3 fill-emerald-600" /> New
                  </span>
                )}
              </div>
              <p className="text-indigo-600 font-semibold text-sm mt-1">{job.company}</p>
            </div>

            <button
              onClick={handleSaveToggle}
              className={cn(
                "p-3 rounded-xl transition-all duration-300 border",
                isSaved 
                  ? "bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm" 
                  : "bg-white border-slate-100 text-slate-400 hover:text-indigo-500 hover:border-indigo-200"
              )}
            >
              <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
            </button>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 my-5 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-400" />
              {job.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-slate-400" />
              {job.locationType}
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <span className="text-slate-900 font-bold">
                ${(job.salary.min / 1000).toFixed(0)}k - ${(job.salary.max / 1000).toFixed(0)}k
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 max-w-2xl font-medium">
            {job.description}
          </p>

          {/* Tags & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-50">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none px-3 py-1 font-bold text-[11px] uppercase">
                {job.department}
              </Badge>
              {job.requirements.slice(0, 2).map((req, index) => (
                <Badge key={index} variant="outline" className="border-slate-200 text-slate-500 font-bold text-[11px] uppercase">
                  {req}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Clock className="h-4 w-4" />
                {timeAgo}
              </div>
              <Button
                onClick={() => onApply(job.id)}
                className="w-full sm:w-auto bg-slate-900 hover:bg-indigo-600 text-white font-bold h-12 px-8 rounded-xl transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-indigo-200 flex gap-2 group"
              >
                Apply Now
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

// Helper component for a generic company logo
function BuildingIcon({ companyName }: { companyName: string }) {
  const firstLetter = companyName.charAt(0).toUpperCase();
  return (
    <span className="text-2xl font-black text-slate-300 select-none group-hover:text-indigo-400 transition-colors">
      {firstLetter}
    </span>
  );
}