/**
 * Custom hook for managing application drafts in localStorage
 * Auto-saves form data and provides recovery functionality
 */

import { useState, useEffect, useCallback } from "react";

interface DraftData {
  [key: string]: any;
}

const DRAFT_KEY_PREFIX = "applicationDraft_";

export function useApplicationDraft(jobId: string | null) {
  const [draft, setDraft] = useState<DraftData | null>(null);
  const [hasDraft, setHasDraft] = useState(false);

  const getDraftKey = useCallback(() => {
    return jobId ? `${DRAFT_KEY_PREFIX}${jobId}` : null;
  }, [jobId]);

  // Load draft from localStorage when jobId changes
  useEffect(() => {
    const key = getDraftKey();
    if (!key) return;

    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        setDraft(parsed);
        setHasDraft(true);
      } else {
        setDraft(null);
        setHasDraft(false);
      }
    } catch (error) {
      console.error("Error loading draft:", error);
      setDraft(null);
      setHasDraft(false);
    }
  }, [getDraftKey]);

  // Save draft to localStorage
  const saveDraft = useCallback(
    (data: DraftData) => {
      const key = getDraftKey();
      if (!key) return;

      try {
        localStorage.setItem(key, JSON.stringify(data));
        setDraft(data);
        setHasDraft(true);
      } catch (error) {
        console.error("Error saving draft:", error);
      }
    },
    [getDraftKey]
  );

  // Clear draft from localStorage
  const clearDraft = useCallback(() => {
    const key = getDraftKey();
    if (!key) return;

    try {
      localStorage.removeItem(key);
      setDraft(null);
      setHasDraft(false);
    } catch (error) {
      console.error("Error clearing draft:", error);
    }
  }, [getDraftKey]);

  // Update specific field in draft
  const updateDraftField = useCallback(
    (fieldName: string, value: any) => {
      const key = getDraftKey();
      if (!key) return;

      const updatedDraft = {
        ...draft,
        [fieldName]: value,
      };

      try {
        localStorage.setItem(key, JSON.stringify(updatedDraft));
        setDraft(updatedDraft);
        setHasDraft(true);
      } catch (error) {
        console.error("Error updating draft field:", error);
      }
    },
    [getDraftKey, draft]
  );

  return {
    draft,
    hasDraft,
    saveDraft,
    clearDraft,
    updateDraftField,
  };
}
