import { reactive, computed } from 'vue'

const state = reactive({ user: null, token: null })

const t = sessionStorage.getItem('token')
const u = sessionStorage.getItem('user')
if (t && u) { state.token = t; state.user = JSON.parse(u) }

async function tryApi(fn) {
  try { return await fn() } catch { return null }
}

export function useAuth() {
  const user = computed(() => state.user)
  const isAuthenticated = () => !!state.user

  const login = async (email, password) => {
    // API synap gör
    const res = await tryApi(async () => {
      const { default: api } = await import('../services/api')
      return await api.post('/auth/login', { email, password })
    })
    if (res?.data) {
      state.token = res.data.token
      state.user = res.data.user
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      return { ok: true }
    }
    // localStorage fallback
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email)
    if (!found) return { ok: false, message: 'Bu e-poçta bilen hasap tapylmady' }
    if (found.password && found.password !== password) return { ok: false, message: 'Parol nädogry' }
    const { password: _, ...safe } = found
    state.user = safe
    sessionStorage.setItem('user', JSON.stringify(safe))
    return { ok: true }
  }

  const register = async (userData) => {
    // API synap gör
    const res = await tryApi(async () => {
      const { default: api } = await import('../services/api')
      return await api.post('/auth/register', userData)
    })
    if (res?.data) {
      state.token = res.data.token
      state.user = res.data.user
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', JSON.stringify(res.data.user))
      return { ok: true }
    }
    // localStorage fallback
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === userData.email)) return { ok: false, message: 'Bu e-poçta eýýäm ulanylypdyr' }
    const isFirst = users.length === 0
    const newUser = { ...userData, id: Date.now().toString(), enrolledCourses: [], isAdmin: isFirst }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const { password: _, ...safe } = newUser
    state.user = safe
    sessionStorage.setItem('user', JSON.stringify(safe))
    return { ok: true }
  }

  const logout = () => {
    state.token = null
    state.user = null
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  }

  const updateUser = async (fields) => {
    await tryApi(async () => {
      const { default: api } = await import('../services/api')
      return await api.put('/users/me', fields)
    })
    const updated = { ...state.user, ...fields }
    state.user = updated
    sessionStorage.setItem('user', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    localStorage.setItem('users', JSON.stringify(users.map(u => u.id === updated.id ? { ...u, ...fields } : u)))
    return { ok: true }
  }

  const enrollCourse = async (courseId) => {
    if (!state.user) return
    await tryApi(async () => {
      const { default: api } = await import('../services/api')
      return await api.post('/enrollments', { courseId })
    })
    const updated = { ...state.user, enrolledCourses: [...(state.user.enrolledCourses || []), courseId] }
    state.user = updated
    sessionStorage.setItem('user', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    localStorage.setItem('users', JSON.stringify(users.map(u => u.id === updated.id ? { ...u, enrolledCourses: updated.enrolledCourses } : u)))
  }

  return { user, isAuthenticated, login, register, logout, enrollCourse, updateUser }
}
