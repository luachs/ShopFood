const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
  {
    orderType: { type: String, required: true },
    amount: { type: Number, required: true },
    orderInfo: { type: String },
    method: { type: String, enum: ['momo', 'vnpay', 'bank', 'cod'], required: true },
    payUrl: { type: String },
    qrDataUrl: { type: String }, // nếu trả về url img
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  },
  { timestamps: true }
)

const Payment = mongoose.model('payment', paymentSchema)

module.exports = Payment
