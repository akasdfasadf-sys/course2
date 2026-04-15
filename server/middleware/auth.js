const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Token barlag
async function protect(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ýok, giriş gadagan' })
  }
  try {
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) return res.status(401).json({ message: 'Ulanyjy tapylmady' })
    next()
  } catch {
    res.status(401).json({ message: 'Token nädogry' })
  }
}

// Admin barlag
function adminOnly(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin hukugy ýok' })
  }
  next()
}

module.exports = { protect, adminOnly }
