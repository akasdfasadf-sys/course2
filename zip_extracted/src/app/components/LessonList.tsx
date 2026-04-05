import { CheckCircle2, Circle, Play, Lock } from 'lucide-react';
import { Lesson } from '../types/course';

interface LessonListProps {
  lessons: Lesson[];
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  enrolled: boolean;
}

export function LessonList({ lessons, currentLessonId, onSelectLesson, enrolled }: LessonListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-900">Course Content</h3>
        <p className="text-sm text-gray-600 mt-1">
          {lessons.filter((l) => l.completed).length} / {lessons.length} lessons completed
        </p>
      </div>

      <div className="divide-y">
        {lessons.map((lesson, index) => {
          const isLocked = !enrolled && index > 0;
          const isCurrent = lesson.id === currentLessonId;

          return (
            <button
              key={lesson.id}
              onClick={() => !isLocked && onSelectLesson(lesson.id)}
              disabled={isLocked}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                isCurrent ? 'bg-blue-50' : ''
              } ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isLocked ? (
                  <Lock className="w-5 h-5 text-gray-400" />
                ) : lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : isCurrent ? (
                  <Play className="w-5 h-5 text-blue-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium ${
                    isCurrent ? 'text-blue-600' : 'text-gray-900'
                  }`}
                >
                  {lesson.title}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{lesson.duration} min</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
