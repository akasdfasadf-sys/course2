const router = require('express').Router()
const { courses, categories } = require('../data/courses')

// GET /api/courses
router.get('/', (req, res) => {
  const { category, level, search } = req.query
  let list = [...courses]
  if (category && category !== 'All') list = list.filter(c => c.categoryTm === category)
  if (level && level !== 'All') list = list.filter(c => c.level === level)
  if (search) {
    const q = search.toLowerCase()
    list = list.filter(c => c.titleTm.toLowerCase().includes(q) || c.descriptionTm.toLowerCase().includes(q))
  }
  res.json(list)
})

// GET /api/courses/categories
router.get('/categories', (req, res) => res.json(categories))

// GET /api/courses/:id
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id)
  if (!course) return res.status(404).json({ message: 'Kurs tapylmady' })
  res.json(course)
})

module.exports = router
