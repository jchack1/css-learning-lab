import { useState } from 'react';
import { loadLessons } from './lessons/loadLessons';
import { Canvas } from './components/Canvas/Canvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { LessonPanel } from './components/LessonPanel/LessonPanel';
import { useProgress } from './progress/useProgress';
import styles from './App.module.css';

const lessons = loadLessons();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(lessons[0]?.id ?? '');
  const [userCSS, setUserCSS] = useState(lessons[0]?.startingCSS ?? '');
  const { completedIds, markComplete, isCompleted } = useProgress();

  const currentIndex = lessons.findIndex((l) => l.id === selectedId);
  const currentLesson = lessons[currentIndex] ?? lessons[0];

  const handleSelectLesson = (id: string) => {
    const lesson = lessons.find((l) => l.id === id);
    if (!lesson) return;
    setSelectedId(id);
    setUserCSS(lesson.startingCSS);
  };

  const handlePrev = () => {
    if (currentIndex > 0) handleSelectLesson(lessons[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) handleSelectLesson(lessons[currentIndex + 1].id);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <button
          className={styles.toggle}
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={sidebarOpen}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <rect y="2" width="16" height="1.5" rx="0.75" />
            <rect y="7.25" width="16" height="1.5" rx="0.75" />
            <rect y="12.5" width="16" height="1.5" rx="0.75" />
          </svg>
        </button>
        <span className={styles.logo}>CSS Learning Lab</span>
      </header>

      <main className={styles.main}>
        <Sidebar
          lessons={lessons}
          selectedId={selectedId}
          onSelect={handleSelectLesson}
          isOpen={sidebarOpen}
          completedIds={completedIds}
        />
        <Canvas
          lessonId={currentLesson.id}
          html={currentLesson.html}
          css={userCSS}
        />
        <LessonPanel
          key={currentLesson.id}
          lesson={currentLesson}
          lessonIndex={currentIndex}
          totalLessons={lessons.length}
          userCSS={userCSS}
          onCSSChange={setUserCSS}
          onPrev={handlePrev}
          onNext={handleNext}
          isCompleted={isCompleted(currentLesson.id)}
          onComplete={markComplete}
        />
      </main>
    </div>
  );
}

export default App;
