import { reactive, computed } from 'vue'

const state = reactive({
  user: null,
})

const stored = localStorage.getItem('currentUser')
if (stored) state.user = JSON.parse(stored)

export function useAuth() {
  const user = computed(() => state.user)
  const isAuthenticated = () => !!state.user

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    // email bilen tap
    const found = users.find(u => u.email === email)
    if (!found) return { ok: false, message: 'Bu e-poçta bilen hasap tapylmady' }
    // parol barlag - parol ýok bolsa (köne hasap) hem geçir
    if (found.password && found.password !== password) {
      return { ok: false, message: 'Parol nädogry' }
    }
    const { password: _, ...safeUser } = found
    state.user = safeUser
    localStorage.setItem('currentUser', JSON.stringify(safeUser))
    return { ok: true }
  }

  const register = async (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === userData.email)) {
      return { ok: false, message: 'Bu e-poçta eýýäm ulanylypdyr' }
    }
    // Ilkinji ulanyjy admin bolýar
    const isFirstUser = users.length === 0
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      enrolledCourses: [],
      isAdmin: isFirstUser,
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const { password: _, ...safeUser } = newUser
    state.user = safeUser
    localStorage.setItem('currentUser', JSON.stringify(safeUser))
    return { ok: true }
  }

  const logout = () => {
    state.user = null
    localStorage.removeItem('currentUser')
  }

  const updateUser = (data) => {
    const updated = { ...state.user, ...data }
    state.user = updated
    localStorage.setItem('currentUser', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    localStorage.setItem('users', JSON.stringify(
      users.map(u => u.id === updated.id ? { ...u, ...data } : u)
    ))
    return { ok: true }
  }

  const enrollCourse = (courseId) => {
    if (!state.user) return
    const updated = {
      ...state.user,
      enrolledCourses: [...(state.user.enrolledCourses || []), courseId],
    }
    state.user = updated
    localStorage.setItem('currentUser', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    localStorage.setItem('users', JSON.stringify(
      users.map(u => u.id === updated.id ? { ...u, enrolledCourses: updated.enrolledCourses } : u)
    ))
  }

  return { user, isAuthenticated, login, register, logout, enrollCourse, updateUser }
}
