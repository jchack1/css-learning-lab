import type { Lesson } from '../../types/lesson';
import styles from './Sidebar.module.css';

interface SidebarProps {
  lessons: Lesson[];
  selectedId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  completedIds: string[];
}

interface LessonGroup {
  category: string;
  lessons: Lesson[];
}

function groupByCategory(lessons: Lesson[]): LessonGroup[] {
  const groups: LessonGroup[] = [];
  const seen = new Map<string, Lesson[]>();

  for (const lesson of lessons) {
    if (!seen.has(lesson.category)) {
      const arr: Lesson[] = [];
      seen.set(lesson.category, arr);
      groups.push({ category: lesson.category, lessons: arr });
    }
    seen.get(lesson.category)!.push(lesson);
  }

  return groups;
}

export function Sidebar({ lessons, selectedId, onSelect, isOpen, completedIds }: SidebarProps) {
  const groups = groupByCategory(lessons);

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? '' : styles.closed}`}
      aria-hidden={!isOpen}
    >
      <div className={styles.inner}>
        {groups.map(({ category, lessons: groupLessons }) => (
          <div key={category} className={styles.group}>
            <p className={styles.categoryLabel}>{category}</p>
            {groupLessons.map((lesson) => {
              const done = completedIds.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  className={lesson.id === selectedId ? styles.activeItem : styles.item}
                  onClick={() => onSelect(lesson.id)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <span className={`${styles.completionMark} ${done ? styles.completionMarkDone : ''}`}>
                    {done ? '✓' : '○'}
                  </span>
                  <span className={styles.lessonTitle}>{lesson.title}</span>
                  <span className={`${styles.dot} ${styles[lesson.difficulty]}`} />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
