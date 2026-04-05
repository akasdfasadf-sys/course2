export interface Lesson {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  titleTm: string;
  description: string;
  descriptionTm: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  category: string;
  categoryTm: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsEnrolled: number;
  basePrice: number;
  price15: number;
  price30: number;
  weeks: number;
  lessons: Lesson[];
  enrolled: boolean;
  progress: number;
  certificateEarned: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameTm: string;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  education: string;
  enrolledCourses: string[];
}

export interface EnrollmentForm {
  courseId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  education: string;
  employmentStatus: string;
  learningGoal: string;
  discountType: '0' | '15' | '30';
  paymentMethod: 'card' | 'cash' | 'bank';
}
