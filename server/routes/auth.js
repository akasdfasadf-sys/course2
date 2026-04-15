const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, dateOfBirth, address, education } = req.body
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Bu e-poçta eýýäm ulanylypdyr' })
    }
    const user = await User.create({ firstName, lastName, email, phone, password, dateOfBirth, address, education })
    res.status(201).json({ token: signToken(user._id), user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'E-poçta ýa parol nädogry' })
    }
    res.json({ token: signToken(user._id), user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/auth/me
router.get('/me', require('../middleware/auth').protect, (req, res) => {
  res.json(req.user)
})

module.exports = router
