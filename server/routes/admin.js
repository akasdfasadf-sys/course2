const router = require('express').Router()
const User = require('../models/User')
const Enrollment = require('../models/Enrollment')
const { protect, adminOnly } = require('../middleware/auth')

// Ähli admin route-lary goragly
router.use(protect, adminOnly)

// GET /api/admin/stats  — umumy statistika
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalEnrollments, recentUsers] = await Promise.all([
      User.countDocuments({ isAdmin: false }),
      Enrollment.countDocuments(),
      User.find({ isAdmin: false }).sort({ createdAt: -1 }).limit(5).select('-password'),
    ])
    res.json({ totalUsers, totalEnrollments, recentUsers })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/admin/users  — ähli ulanyjylar
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query
    const filter = { isAdmin: false }
    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
      ]
    }
    const [users, total] = await Promise.all([
      User.find(filter).select('-password').sort({ createdAt: -1 })
        .skip((page - 1) * limit).limit(Number(limit)),
      User.countDocuments(filter),
    ])
    res.json({ users, total, pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/admin/users/:id  — ulanyjy öçür
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    await Enrollment.deleteMany({ userId: req.params.id })
    res.json({ message: 'Ulanyjy öçürildi' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/admin/enrollments  — ähli ýazylmalar
router.get('/enrollments', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const [enrollments, total] = await Promise.all([
      Enrollment.find().populate('userId', 'firstName lastName email phone')
        .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Enrollment.countDocuments(),
    ])
    res.json({ enrollments, total, pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT /api/admin/users/:id/toggle-admin  — admin et / aýyr
router.put('/users/:id/toggle-admin', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Tapylmady' })
    user.isAdmin = !user.isAdmin
    await user.save()
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
