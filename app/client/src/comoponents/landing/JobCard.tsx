import { memo, useState, useEffect } from "react";
import { MapPin, Bookmark, DollarSign, Briefcase, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { JobListing } from "../../data/mockJobs";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: JobListing;
  onApply: (jobId: string) => void;
}

export const JobCard = memo(function JobCard({ job, onApply }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setIsSaved(savedJobs.includes(job.id));
  }, [job.id]);

  const handleSaveToggle = () => {
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
      className={`bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow duration-200 ${
        job.featured ? "border-blue-300 shadow-md" : "border-gray-200"
      }`}
      aria-label={`Job posting for ${job.title} at ${job.company}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            {job.isNew && (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                NEW
              </Badge>
            )}
            {job.featured && (
              <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                Featured
              </Badge>
            )}
          </div>
          <p className="text-gray-600">{job.company}</p>
        </div>

        <button
          onClick={handleSaveToggle}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isSaved ? "Remove from saved jobs" : "Save job for later"}
          aria-pressed={isSaved}
        >
          <Bookmark
            className={`h-5 w-5 ${
              isSaved ? "fill-blue-500 text-blue-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          <span>{job.locationType}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span>
            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary">{job.department}</Badge>
        {job.requirements.slice(0, 2).map((req, index) => (
          <Badge key={index} variant="outline">
            {req}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{timeAgo}</span>
        </div>
        <Button
          onClick={() => onApply(job.id)}
          className="bg-blue-600 hover:bg-blue-700"
          aria-label={`Apply for ${job.title} position`}
        >
          Apply Now
        </Button>
      </div>
    </article>
  );
});
