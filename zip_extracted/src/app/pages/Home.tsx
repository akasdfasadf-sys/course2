import { Link } from 'react-router';
import { ArrowRight, TrendingUp, Award, Users } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';

export function Home() {
  const featuredCourses = courses.slice(0, 3);
  const popularCourses = courses.slice(3, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Täze başarnyklary öwreniň
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Hünärmenler tarapyndan öwredilýän müňlerçe kursa giriň. Häzir öwrenip başlaň we karýeraňyzy ösdüriň.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Kurslary görmek
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">22</p>
              <p className="text-gray-600 mt-1">Hünär kurslary</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">5,000+</p>
              <p className="text-gray-600 mt-1">Aktiwçi okuwçylar</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">95%</p>
              <p className="text-gray-600 mt-1">Üstünlik derejesi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Saýlanan kurslar</h2>
            <p className="text-gray-600 mt-2">Siziň üçin saýlanan kurslar</p>
          </div>
          <Link
            to="/courses"
            className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
          >
            Hemmesini gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Meşhur kurslar</h2>
            <p className="text-gray-600 mt-2">Bu aýda iň köp ýazylynlan kurslar</p>
          </div>
          <Link
            to="/courses"
            className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
          >
            Hemmesini gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
