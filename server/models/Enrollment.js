const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
  userId:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId:         { type: String, required: true },
  employmentStatus: { type: String },
  learningGoal:     { type: String },
  discountType:     { type: String, default: '0' },
  paymentMethod:    { type: String, default: 'card' },
  price:            { type: Number },
  progress:         { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Enrollment', enrollmentSchema)
