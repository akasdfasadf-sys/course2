require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/enrollments', require('./routes/enrollments'))
app.use('/api/courses', require('./routes/courses'))
app.use('/api/admin', require('./routes/admin'))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB birikdi')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server http://localhost:${PORT} portunda işleýär`))
  })
  .catch(err => {
    console.error('MongoDB birikme ýalňyşlygy:', err.message)
    process.exit(1)
  })
