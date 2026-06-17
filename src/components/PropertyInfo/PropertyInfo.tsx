import type { Lesson } from '../../types/lesson';
import styles from './PropertyInfo.module.css';

interface PropertyInfoProps {
  lesson: Lesson;
}

export function PropertyInfo({ lesson }: PropertyInfoProps) {
  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <h2 className={styles.title}>{lesson.title}</h2>
        <div className={styles.meta}>
          <span className={styles.category}>{lesson.category}</span>
          <span className={`${styles.difficulty} ${styles[lesson.difficulty]}`}>
            {lesson.difficulty}
          </span>
        </div>
      </div>

      <p className={styles.description}>{lesson.description}</p>

      <div className={styles.challenge}>
        <span className={styles.challengeLabel}>Challenge</span>
        <p className={styles.challengeText}>{lesson.challenge}</p>
      </div>

      <div className={styles.comparison}>
        <div className={styles.comparisonBlock}>
          <h3 className={styles.comparisonLabel}>Old way</h3>
          <pre className={styles.code}><code>{lesson.oldWay}</code></pre>
        </div>
        <div className={styles.comparisonBlock}>
          <h3 className={styles.comparisonLabel}>Modern CSS</h3>
          <pre className={styles.code}><code>{lesson.modernWay}</code></pre>
        </div>
      </div>
    </div>
  );
}
