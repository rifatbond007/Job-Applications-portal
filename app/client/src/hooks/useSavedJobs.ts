/**
 * Custom hook for managing saved jobs in localStorage
 * Provides a clean API for saving, removing, and checking saved jobs
 */

import { useState, useEffect, useCallback } from "react";

const SAVED_JOBS_KEY = "savedJobs";

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_JOBS_KEY);
      if (stored) {
        setSavedJobs(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading saved jobs:", error);
    }
  }, []);

  // Save jobs to localStorage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
    } catch (error) {
      console.error("Error saving jobs:", error);
    }
  }, [savedJobs]);

  // Check if a job is saved
  const isJobSaved = useCallback(
    (jobId: string): boolean => {
      return savedJobs.includes(jobId);
    },
    [savedJobs]
  );

  // Toggle saved state for a job
  const toggleSavedJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  }, []);

  // Add a job to saved jobs
  const saveJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => {
      if (!prev.includes(jobId)) {
        return [...prev, jobId];
      }
      return prev;
    });
  }, []);

  // Remove a job from saved jobs
  const unsaveJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => prev.filter((id) => id !== jobId));
  }, []);

  // Clear all saved jobs
  const clearSavedJobs = useCallback(() => {
    setSavedJobs([]);
  }, []);

  // Get count of saved jobs
  const savedJobsCount = savedJobs.length;

  return {
    savedJobs,
    savedJobsCount,
    isJobSaved,
    toggleSavedJob,
    saveJob,
    unsaveJob,
    clearSavedJobs,
  };
}
