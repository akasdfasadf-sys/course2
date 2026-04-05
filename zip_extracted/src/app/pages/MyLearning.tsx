import { Link } from 'react-router';
import { BookOpen } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';

export function MyLearning() {
  const { user } = useAuth();
  const enrolledCourses = courses.filter((course) => 
    user?.enrolledCourses?.includes(course.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meniň kurslarym</h1>
          <p className="text-gray-600">
            Okuw syýahatyňyzy dowam ediň
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {enrolledCourses.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {enrolledCourses.length} kurs dowam edýär
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Entek kursyňyz ýok
            </h2>
            <p className="text-gray-600 mb-6">
              Häzir kurs saýlap, öwrenmäge başlaň
            </p>
            <Link
              to="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Kurslary gör
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}