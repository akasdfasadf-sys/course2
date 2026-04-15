const router = require('express').Router()
const User = require('../models/User')
const { protect } = require('../middleware/auth')

// GET /api/users/me  — öz profilini al
router.get('/me', protect, (req, res) => res.json(req.user))

// PUT /api/users/me  — öz profilini täzele
router.put('/me', protect, async (req, res) => {
  try {
    const allowed = ['firstName', 'lastName', 'phone', 'address', 'education']
    const updates = {}
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k] })
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
