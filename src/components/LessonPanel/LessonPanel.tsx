import { useState } from 'react';
import type { Lesson } from '../../types/lesson';
import { validateCSS } from '../../engine/validator';
import type { ValidationResult } from '../../engine/validator';
import { PropertyInfo } from '../PropertyInfo/PropertyInfo';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import styles from './LessonPanel.module.css';

interface LessonPanelProps {
  lesson: Lesson;
  lessonIndex: number;
  totalLessons: number;
  userCSS: string;
  onCSSChange: (css: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LessonPanel({
  lesson,
  lessonIndex,
  totalLessons,
  userCSS,
  onCSSChange,
  onPrev,
  onNext,
}: LessonPanelProps) {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const handleCSSChange = (css: string) => {
    setValidationResult(null);
    onCSSChange(css);
  };

  const handleCheck = () => {
    const result = validateCSS(userCSS, lesson.expectedCSS, lesson.targetSelector);
    setValidationResult(result);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.lessonNav}>
        <button
          className={styles.navBtn}
          onClick={onPrev}
          disabled={lessonIndex === 0}
          aria-label="Previous lesson"
        >
          ← Prev
        </button>
        <span className={styles.navProgress}>
          {lessonIndex + 1} / {totalLessons}
        </span>
        <button
          className={styles.navBtn}
          onClick={onNext}
          disabled={lessonIndex === totalLessons - 1}
          aria-label="Next lesson"
        >
          Next →
        </button>
      </div>

      <div className={styles.scroll}>
        <PropertyInfo lesson={lesson} />
        <CodeEditor
          css={userCSS}
          onChange={handleCSSChange}
          startingCSS={lesson.startingCSS}
          onCheck={handleCheck}
          validationResult={validationResult}
        />
      </div>
    </div>
  );
}
