import { reactive, readonly } from 'vue'

const state = reactive({
  user: null,
})

// Load from localStorage on init
const stored = localStorage.getItem('currentUser')
if (stored) state.user = JSON.parse(stored)

export function useAuth() {
  const isAuthenticated = () => !!state.user

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email)
    if (found) {
      state.user = found
      localStorage.setItem('currentUser', JSON.stringify(found))
      return true
    }
    return false
  }

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === userData.email)) return false
    const newUser = { ...userData, id: Date.now().toString(), enrolledCourses: [] }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    state.user = newUser
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    state.user = null
    localStorage.removeItem('currentUser')
  }

  const enrollCourse = (courseId) => {
    if (!state.user) return
    const updated = { ...state.user, enrolledCourses: [...(state.user.enrolledCourses || []), courseId] }
    state.user = updated
    localStorage.setItem('currentUser', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    localStorage.setItem('users', JSON.stringify(users.map(u => u.id === updated.id ? updated : u)))
  }

  return { user: state, isAuthenticated, login, register, logout, enrollCourse }
}
