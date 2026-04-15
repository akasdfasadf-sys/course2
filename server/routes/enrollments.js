const router = require('express').Router()
const Enrollment = require('../models/Enrollment')
const User = require('../models/User')
const { protect } = require('../middleware/auth')

// POST /api/enrollments  — kursa ýazyl
router.post('/', protect, async (req, res) => {
  try {
    const { courseId, employmentStatus, learningGoal, discountType, paymentMethod, price } = req.body
    const exists = await Enrollment.findOne({ userId: req.user._id, courseId })
    if (exists) return res.status(400).json({ message: 'Eýýäm ýazylan' })

    const enrollment = await Enrollment.create({
      userId: req.user._id, courseId, employmentStatus,
      learningGoal, discountType, paymentMethod, price,
    })
    // enrolledCourses listine goş
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { enrolledCourses: courseId } })
    res.status(201).json(enrollment)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/enrollments/my  — öz ýazylmalarym
router.get('/my', protect, async (req, res) => {
  try {
    const list = await Enrollment.find({ userId: req.user._id })
    res.json(list)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT /api/enrollments/:id/progress  — progress täzele
router.put('/:id/progress', protect, async (req, res) => {
  try {
    const e = await Enrollment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { progress: req.body.progress },
      { new: true }
    )
    if (!e) return res.status(404).json({ message: 'Tapylmady' })
    res.json(e)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
