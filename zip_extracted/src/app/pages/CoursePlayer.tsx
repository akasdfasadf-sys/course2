import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ChevronLeft, CheckCircle, Award } from 'lucide-react';
import { courses } from '../data/courses';
import { VideoPlayer } from '../components/VideoPlayer';
import { LessonList } from '../components/LessonList';

export function CoursePlayer() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const [currentLessonId, setCurrentLessonId] = useState(course?.lessons[0]?.id || '');
  const [showCertificate, setShowCertificate] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Kurs tapylmady</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700">
            Ähli kurslary gör
          </Link>
        </div>
      </div>
    );
  }

  const currentLesson = course.lessons[0] || { id: '1', title: 'Kursa giriş', duration: 30, videoUrl: '', completed: false };
  const currentIndex = 0;

  const handleMarkComplete = () => {
    // Simulate completion
    setShowCertificate(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to={`/course/${course.id}`}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Kursa dolan</span>
            </Link>

            <div className="flex-1 mx-8 max-w-md">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {course.progress}% tamamlandy
              </p>
            </div>

            <div className="text-sm text-gray-600">
              Sapak {currentIndex + 1}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer lessonTitle={currentLesson?.title || ''} />

            {/* Lesson Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {currentLesson?.title}
              </h1>
              <p className="text-gray-600 mb-6">
                Bu sapakda esasy düşünjeleri we amaly ulanylyşlaryny öwrenersiňiz.
              </p>

              <div className="flex items-center gap-4">
                {!currentLesson?.completed && (
                  <button
                    onClick={handleMarkComplete}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Tamamlandy diýip bellemek
                  </button>
                )}
              </div>
            </div>

            {/* Certificate */}
            {showCertificate && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm p-8 border-2 border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Gutlaýarys!
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Siz "{course.titleTm}" kursyny üstünlikli tamamladyňyz!
                  </p>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Sertifikaty göçürip almak
                  </button>
                </div>
              </div>
            )}

            {/* Tabs for Overview, Resources, etc */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  <button className="px-6 py-3 font-medium text-blue-600 border-b-2 border-blue-600">
                    Syn
                  </button>
                  <button className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900">
                    Çeşmeler
                  </button>
                  <button className="px-6 py-3 font-medium text-gray-600 hover:text-gray-900">
                    Soraglar
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Bu sapak barada</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bu giňişleýin sapak esasy mowzuklary öz içine alýar we size düşünjeleri netijeli
                  ulanyp we amaly mysal bilen işlemäge kömek edýär. Siz hakyky dünýä ýagdaýlarynda
                  derrew ulanyp biljek amaly tejribe gazanarysňyz.
                </p>
              </div>
            </div>
          </div>

          {/* Lesson List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-900">Kurs mazmuny</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Sapaklar meýilnamasy
                </p>
              </div>
              <div className="p-4">
                <p className="text-gray-600">
                  Bu kurs üçin sapaklar entek goşulmady. Ýakyn wagtda goşular.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}