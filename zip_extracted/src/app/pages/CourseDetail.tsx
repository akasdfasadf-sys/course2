import { useParams, Link } from 'react-router';
import { Star, Users, Clock, Award, ChevronRight, Play } from 'lucide-react';
import { courses } from '../data/courses';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';

export function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const course = courses.find((c) => c.id === id);

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

  const isEnrolled = user?.enrolledCourses?.includes(course.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Link to="/courses" className="text-gray-300 hover:text-white">
                  Kurslar
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{course.categoryTm}</span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.titleTm}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.descriptionTm}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <ImageWithFallback
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-400">Mugallym</p>
                    <p className="font-medium">{course.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-400 ml-1">
                    ({course.studentsEnrolled} okuwçy)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.weeks} hepde</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.studentsEnrolled} okuwçy</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg sticky top-24">
                <div className="aspect-video">
                  <ImageWithFallback
                    src={course.thumbnail}
                    alt={course.titleTm}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">{course.price30} TMT</span>
                      <span className="text-lg text-gray-500 line-through">{course.basePrice} TMT</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">30% arzanladyş</p>
                  </div>

                  {isEnrolled ? (
                    <>
                      <Link
                        to={`/course/${course.id}/learn`}
                        className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
                      >
                        Dowam et
                      </Link>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Siziň ösüşiňiz</span>
                          <span className="text-sm font-medium text-gray-900">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/course/${course.id}/enroll`}
                        className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-2"
                      >
                        Ýazylmak
                      </Link>
                      <p className="text-sm text-gray-600 text-center">
                        Tölegiňizi 2-3 aýa böläýsiňiz
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Näme öwrenersiňiz</h2>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Esaslardan başlap ösen düşünjelere çenli ähli mowzuklary öwrenersiňiz
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Hakyky dünýä taslamalaryny döredip, amaly tejribe gazanarysňyz
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Pudakda ulanylýan iň gowy tejribeleri we usullary öwrenersiňiz
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">
                    Kursy tamamlanyňyzdan soň resmi sertifikat alarysňyz
                  </span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Talap edilýän bilimler</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ul className="space-y-3 text-gray-700">
                <li>• Esasy kompýuter sowatlylygy ýeterlikdir</li>
                <li>• Täze başarnyklary öwrenmäge isleg we höwes</li>
                <li>• Her sapak üçin 2-3 sagat wagt</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kurs barada</h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Dowamlylygy:</span>
                <span className="font-medium text-gray-900">{course.weeks} hepde</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Okuwçylar:</span>
                <span className="font-medium text-gray-900">{course.studentsEnrolled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Baha:</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900">{course.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sertifikat:</span>
                <span className="font-medium text-green-600">Hawa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
