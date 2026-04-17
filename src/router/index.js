import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../stores/auth'

const routes = [
  { path: '/', component: () => import('../pages/Landing.vue') },
  { path: '/about', component: () => import('../pages/About.vue') },
  { path: '/login', component: () => import('../pages/Login.vue') },
  { path: '/register', component: () => import('../pages/Register.vue') },
  {
    path: '/home', component: () => import('../pages/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/courses', component: () => import('../pages/Courses.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course/:id', component: () => import('../pages/CourseDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course/:id/enroll', component: () => import('../pages/EnrollmentForm.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course/:id/learn', component: () => import('../pages/CoursePlayer.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-learning', component: () => import('../pages/MyLearning.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile', component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const { isAuthenticated, user } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated()) return '/login'
  if (to.meta.requiresAdmin && !user.value?.isAdmin) return '/home'
})

export default router
