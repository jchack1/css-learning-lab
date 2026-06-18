import { useState } from 'react';
import type { Lesson } from '../../types/lesson';
import styles from './PropertyInfo.module.css';

interface PropertyInfoProps {
  lesson: Lesson;
  isCompleted: boolean;
}

export function PropertyInfo({ lesson, isCompleted }: PropertyInfoProps) {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const hasAlternatives = isCompleted && (lesson.alternatives?.length ?? 0) > 0;

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

      <p className={`${styles.completionStatus} ${isCompleted ? styles.completionDone : styles.completionPending}`}>
        {isCompleted ? '✓ Completed' : '○ Not completed yet'}
      </p>

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

      {hasAlternatives && (
        <button
          className={styles.seeOtherBtn}
          onClick={() => setShowAlternatives(v => !v)}
        >
          {showAlternatives ? '▴' : '▾'} See other solutions
        </button>
      )}

      {hasAlternatives && showAlternatives && (
        <div className={styles.alternatives}>
          <p className={styles.alternativesHeading}>Other solutions</p>
          {lesson.alternatives!.map((alt, i) => (
            <div key={i} className={styles.alternative}>
              <p className={styles.alternativeName}>{alt.name}</p>
              <p className={styles.alternativeDescription}>{alt.description}</p>
              <pre className={styles.code}><code>{alt.css}</code></pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
