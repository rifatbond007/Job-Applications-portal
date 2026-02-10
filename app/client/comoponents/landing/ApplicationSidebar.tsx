import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import type { JobListing } from "../../data/mockJobs";

// Form validation schema
const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, "Invalid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  portfolioUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobListing | null;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const STORAGE_KEY = "applicationDraft";

export function ApplicationSidebar({
  isOpen,
  onClose,
  job,
}: ApplicationSidebarProps) {
  const [resumeFile, setResumeFile] = useState<UploadedFile | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    if (isOpen && job) {
      const draftKey = `${STORAGE_KEY}_${job.id}`;
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          Object.keys(draft).forEach((key) => {
            setValue(key as keyof ApplicationFormData, draft[key]);
          });
          toast.info("Draft restored from previous session");
        } catch (error) {
          console.error("Failed to load draft:", error);
        }
      }
    }
  }, [isOpen, job, setValue]);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (!job) return;

    const subscription = watch((data) => {
      const draftKey = `${STORAGE_KEY}_${job.id}`;
      localStorage.setItem(draftKey, JSON.stringify(data));
    });

    return () => subscription.unsubscribe();
  }, [watch, job]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "resume" | "portfolio"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      if (type === "resume") {
        setResumeFile(uploadedFile);
        toast.success("Resume uploaded successfully");
      } else {
        setPortfolioFile(uploadedFile);
        toast.success("Portfolio uploaded successfully");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, type: "resume" | "portfolio") => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      if (type === "resume") {
        setResumeFile(uploadedFile);
        toast.success("Resume uploaded successfully");
      } else {
        setPortfolioFile(uploadedFile);
        toast.success("Portfolio uploaded successfully");
      }
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear draft from localStorage
    if (job) {
      localStorage.removeItem(`${STORAGE_KEY}_${job.id}`);
    }

    toast.success("Application submitted successfully!", {
      description: `You've applied for ${job?.title} at ${job?.company}`,
    });

    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setResumeFile(null);
    setPortfolioFile(null);
    onClose();
  };

  if (!job) return null;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        className="w-full sm:max-w-xl overflow-y-auto"
        aria-describedby="application-form-description"
      >
        <SheetHeader>
          <SheetTitle>Apply for {job.title}</SheetTitle>
          <SheetDescription id="application-form-description">
            {job.company} • {job.location}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="John Doe"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <p
                id="fullName-error"
                className="text-sm text-red-500 mt-1 flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-sm text-red-500 mt-1 flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+1 (555) 123-4567"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="text-sm text-red-500 mt-1 flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Portfolio URL */}
          <div>
            <Label htmlFor="portfolioUrl">Portfolio/Website (Optional)</Label>
            <Input
              id="portfolioUrl"
              type="url"
              {...register("portfolioUrl")}
              placeholder="https://yourportfolio.com"
              aria-invalid={!!errors.portfolioUrl}
              aria-describedby={errors.portfolioUrl ? "portfolio-error" : undefined}
            />
            {errors.portfolioUrl && (
              <p
                id="portfolio-error"
                className="text-sm text-red-500 mt-1 flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.portfolioUrl.message}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <Label>
              Resume <span className="text-red-500">*</span>
            </Label>
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "resume")}
            >
              {resumeFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{resumeFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(resumeFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setResumeFile(null)}
                    aria-label="Remove resume"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Drag and drop your resume, or{" "}
                    <button
                      type="button"
                      onClick={() => resumeInputRef.current?.click()}
                      className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                </>
              )}
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, "resume")}
                className="hidden"
                aria-label="Upload resume file"
              />
            </div>
          </div>

          {/* Portfolio Upload (Optional) */}
          <div>
            <Label>Portfolio Files (Optional)</Label>
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, "portfolio")}
            >
              {portfolioFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{portfolioFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(portfolioFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setPortfolioFile(null)}
                    aria-label="Remove portfolio file"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <button
                      type="button"
                      onClick={() => portfolioInputRef.current?.click()}
                      className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    >
                      Upload additional files
                    </button>
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                </>
              )}
              <input
                ref={portfolioInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, "portfolio")}
                className="hidden"
                aria-label="Upload portfolio file"
              />
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter">
              Cover Letter <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="coverLetter"
              {...register("coverLetter")}
              placeholder="Tell us why you're a great fit for this role..."
              rows={6}
              aria-invalid={!!errors.coverLetter}
              aria-describedby={errors.coverLetter ? "coverLetter-error" : undefined}
            />
            {errors.coverLetter && (
              <p
                id="coverLetter-error"
                className="text-sm text-red-500 mt-1 flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.coverLetter.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
