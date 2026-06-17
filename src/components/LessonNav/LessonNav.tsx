import type { Lesson } from '../../types/lesson';
import styles from './LessonNav.module.css';

interface LessonNavProps {
  lessons: Lesson[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function LessonNav({ lessons, selectedId, onSelect }: LessonNavProps) {
  return (
    <nav className={styles.nav}>
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          className={lesson.id === selectedId ? styles.active : styles.item}
          onClick={() => onSelect(lesson.id)}
        >
          <span className={styles.category}>{lesson.category}</span>
          <span className={styles.title}>{lesson.title}</span>
        </button>
      ))}
    </nav>
  );
}
