import { Link } from 'react-router';
import { Star, Users, Clock } from 'lucide-react';
import { Course } from '../types/course';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { user } = useAuth();
  const isEnrolled = user?.enrolledCourses?.includes(course.id);

  return (
    <Link to={`/course/${course.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-video overflow-hidden">
          <ImageWithFallback
            src={course.thumbnail}
            alt={course.titleTm}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isEnrolled && course.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 p-2">
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-white text-xs mt-1">{course.progress}% tamamlandy</p>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {course.categoryTm}
            </span>
            <span className="text-xs text-gray-500">{course.weeks} hepde</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.titleTm}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {course.descriptionTm}
          </p>

          <div className="flex items-center gap-1 mb-3">
            <ImageWithFallback
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">{course.instructor}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.studentsEnrolled}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-semibold text-gray-900">{course.price30} TMT</span>
              <span className="text-sm text-gray-500 line-through ml-2">{course.basePrice} TMT</span>
            </div>
            {isEnrolled && (
              <span className="text-sm font-medium text-green-600">Ýazylan</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}