import { useEffect, useRef } from 'react';
import { buildSrcdoc } from '../../engine/cssRunner';
import styles from './Canvas.module.css';

interface CanvasProps {
  lessonId: string;
  html: string;
  css: string;
}

export function Canvas({ lessonId, html, css }: CanvasProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const prevLessonIdRef = useRef<string | null>(null);
  const cssRef = useRef(css);

  // Always reflect latest CSS so the onLoad handler can read it
  cssRef.current = css;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const isNewLesson = prevLessonIdRef.current !== lessonId;
    prevLessonIdRef.current = lessonId;

    if (isNewLesson) {
      iframe.srcdoc = buildSrcdoc(html, css);
      return;
    }

    // CSS-only update via postMessage — works across the sandbox boundary
    iframe.contentWindow?.postMessage({ type: 'css-update', css }, '*');
  }, [lessonId, html, css]);

  return (
    <div className={styles.wrapper}>
      <iframe
        ref={iframeRef}
        title="CSS preview"
        sandbox="allow-scripts"
        className={styles.iframe}
        onLoad={() => {
          // Re-apply latest CSS after each srcdoc load, catching any change
          // that arrived while the iframe was still loading its new document
          iframeRef.current?.contentWindow?.postMessage(
            { type: 'css-update', css: cssRef.current },
            '*'
          );
        }}
      />
    </div>
  );
}
