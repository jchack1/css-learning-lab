import { useState } from 'react';
import { getCompletedLessons, saveCompletedLesson } from './progressStorage';

export function useProgress() {
  const [completedIds, setCompletedIds] = useState<string[]>(() => getCompletedLessons());

  const markComplete = (id: string) => {
    if (completedIds.includes(id)) return;
    const updated = saveCompletedLesson(id);
    setCompletedIds(updated);
  };

  const isCompleted = (id: string) => completedIds.includes(id);

  return { completedIds, markComplete, isCompleted };
}
