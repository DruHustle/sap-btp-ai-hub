import { useState, useEffect } from "react";
import { safeLocalStorage } from "@/lib/storage";

interface Progress {
  completedTutorials: number[];
  lastVisited: number | null;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = safeLocalStorage.getItem("sap-btp-ai-hub-progress");
    return saved
      ? JSON.parse(saved)
      : { completedTutorials: [], lastVisited: null };
  });

  useEffect(() => {
    safeLocalStorage.setItem("sap-btp-ai-hub-progress", JSON.stringify(progress));
  }, [progress]);

  const markAsCompleted = (tutorialId: number) => {
    setProgress((prev) => {
      if (prev.completedTutorials.includes(tutorialId)) return prev;
      return {
        ...prev,
        completedTutorials: [...prev.completedTutorials, tutorialId],
      };
    });
  };

  const markAsVisited = (tutorialId: number) => {
    setProgress((prev) => ({
      ...prev,
      lastVisited: tutorialId,
    }));
  };

  const isCompleted = (tutorialId: number) => {
    return progress.completedTutorials.includes(tutorialId);
  };

  const getProgressPercentage = (totalTutorials: number) => {
    return Math.round((progress.completedTutorials.length / totalTutorials) * 100);
  };

  return {
    progress,
    markAsCompleted,
    markAsVisited,
    isCompleted,
    getProgressPercentage,
  };
}
