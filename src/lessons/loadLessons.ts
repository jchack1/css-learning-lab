import type { Lesson } from '../types/lesson';

const lessonModules = import.meta.glob<Lesson>('../content/**/*.json', {
  eager: true,
  import: 'default',
});

export function loadLessons(): Lesson[] {
  return Object.values(lessonModules).sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );
}
