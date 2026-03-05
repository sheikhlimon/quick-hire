import { useState } from "react";

export function useExpandableCoverNotes() {
  const [expandedCoverNotes, setExpandedCoverNotes] = useState<Set<string>>(new Set());

  const toggleCoverNote = (appId: string) => {
    setExpandedCoverNotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(appId)) {
        newSet.delete(appId);
      } else {
        newSet.add(appId);
      }
      return newSet;
    });
  };

  const isExpanded = (appId: string) => expandedCoverNotes.has(appId);

  return { expandedCoverNotes, toggleCoverNote, isExpanded };
}
