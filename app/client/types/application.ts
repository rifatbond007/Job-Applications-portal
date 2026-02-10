/**
 * Application-related TypeScript interfaces
 */

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  coverLetter: string;
}

export interface SavedJobsData {
  jobIds: string[];
  lastUpdated: string;
}

export interface ApplicationDraft extends ApplicationFormData {
  jobId: string;
  lastSaved: string;
}

export type ApplicationStatus = "applied" | "reviewing" | "interviewing" | "offer" | "rejected";

export interface UserApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  nextStep?: string;
}
