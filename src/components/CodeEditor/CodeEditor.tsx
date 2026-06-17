import type { ValidationResult } from '../../engine/validator';
import styles from './CodeEditor.module.css';

interface CodeEditorProps {
  css: string;
  onChange: (css: string) => void;
  startingCSS: string;
  onCheck: () => void;
  validationResult: ValidationResult | null;
}

const INDENT = '  ';

export function CodeEditor({
  css,
  onChange,
  startingCSS,
  onCheck,
  validationResult,
}: CodeEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      onChange(el.value.substring(0, start) + INDENT + el.value.substring(end));
      requestAnimationFrame(() => {
        el.selectionStart = start + INDENT.length;
        el.selectionEnd = start + INDENT.length;
      });
      return;
    }

    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      onCheck();
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editorHeader}>
        <span className={styles.editorLabel}>CSS Editor</span>
        <button
          className={styles.resetButton}
          onClick={() => onChange(startingCSS)}
        >
          Reset
        </button>
      </div>

      <textarea
        className={styles.textarea}
        value={css}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Write your CSS here..."
      />

      <div className={styles.footer}>
        {validationResult && (
          <p
            className={
              validationResult.passed ? styles.feedbackPass : styles.feedbackFail
            }
          >
            {validationResult.feedback}
          </p>
        )}
        <div className={styles.checkWrapper}>
          <button className={styles.checkButton} onClick={onCheck}>
            Check my CSS
          </button>
          <span className={styles.shortcutHint}>Ctrl+Enter</span>
        </div>
      </div>
    </div>
  );
}
