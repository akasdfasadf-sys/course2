import { createBrowserRouter } from 'react-router';
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { EnrollmentForm } from './pages/EnrollmentForm';
import { CoursePlayer } from './pages/CoursePlayer';
import { MyLearning } from './pages/MyLearning';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: Landing },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path: 'home', Component: Home },
      { path: 'courses', Component: Courses },
      { path: 'course/:id', Component: CourseDetail },
      { path: 'course/:id/enroll', Component: EnrollmentForm },
      { path: 'course/:id/learn', Component: CoursePlayer },
      { path: 'my-learning', Component: MyLearning },
    ],
  },
]);
