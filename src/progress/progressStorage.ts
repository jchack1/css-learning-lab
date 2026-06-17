const STORAGE_KEY = 'css-lab-completions';

export function getCompletedLessons(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCompletedLesson(id: string): string[] {
  const current = getCompletedLessons();
  if (current.includes(id)) return current;
  const updated = [...current, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function isLessonCompleted(id: string): boolean {
  return getCompletedLessons().includes(id);
}
