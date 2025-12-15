const Payment = require('../models/core/payment')
const { createMoMoPayment } = require('../utils/momo')
const { createVNPayUrl } = require('../utils/vnpay')
const { generateBankQR, bankInfo } = require('../utils/vietqr')

module.exports = {
  // CREATE MoMo payment -> trả payUrl
  createMoMo: async (req, res) => {
    try {
      const { amount, orderInfo } = req.body
      const orderId = 'ORDER_' + Date.now()

      const momoResp = await createMoMoPayment({ orderId, amount, orderInfo })

      if (momoResp.resultCode !== 0) {
        return res.status(400).json({
          success: false,
          message: momoResp.message,
          momoResp,
        })
      }

      const payUrl = momoResp.payUrl

      await Payment.create({
        orderType: req.body.orderType || 'online',
        orderId,
        amount,
        orderInfo,
        method: 'momo',
        payUrl,
      })

      return res.json({ success: true, payUrl })
    } catch (err) {
      console.error('createMoMo error:', err?.response?.data || err.message)
      return res.status(500).json({ success: false, message: 'MoMo create error' })
    }
  },
  // CREATE VNPay -> trả url để redirect
  createVNPay: async (req, res) => {
    try {
      const { amount, orderInfo, orderType } = req.body

      if (!amount || !orderInfo) {
        return res.status(400).json({
          success: false,
          message: 'amount và orderInfo là bắt buộc',
        })
      }

      const orderId = 'ORDER_' + Date.now()

      const vnpUrl = await createVNPayUrl({
        orderId,
        amount,
        orderInfo,
        orderType,
        ipAddr: req.ip,
      })

      await Payment.create({
        orderType: orderType || 'online',
        orderId,
        amount,
        orderInfo,
        method: 'vnpay',
        payUrl: vnpUrl,
      })

      return res.json({
        success: true,
        payUrl: vnpUrl,
      })
    } catch (err) {
      console.error('createVNPay error:', err)
      return res.status(500).json({
        success: false,
        message: 'VNPay create error',
      })
    }
  },

  // CREATE Bank transfer -> trả info + QR
  createBank: async (req, res) => {
    try {
      const { amount, orderInfo } = req.body
      const orderId = 'ORDER_' + Date.now()

      const { dataUrl, payload } = await generateBankQR({ orderId, amount })

      await Payment.create({
        orderType: req.body.orderType || 'online',
        orderId,
        amount,
        orderInfo,
        method: 'bank',
        qrDataUrl: dataUrl,
      })

      return res.json({
        success: true,
        orderId,
        amount,
        bankInfo,
        qrDataUrl: dataUrl,
        payload,
        note: 'Chuyển khoản theo nội dung ORDER_xxx để tự động đối soát',
      })
    } catch (err) {
      console.error('createBank error:', err)
      return res.status(500).json({ success: false, message: 'Bank QR error' })
    }
  },

  // CREATE COD -> lưu order, trả success
  createCOD: async (req, res) => {
    try {
      const { amount, orderInfo } = req.body
      const orderId = 'ORDER_' + Date.now()

      await Payment.create({
        orderType: req.body.orderType || 'online',
        orderId,
        amount,
        orderInfo,
        method: 'cod',
        status: 'pending',
      })

      return res.json({ success: true, orderId, message: 'Order created - COD' })
    } catch (err) {
      console.error('createCOD error:', err)
      return res.status(500).json({ success: false, message: 'COD error' })
    }
  },

  // MoMo return GET (user redirected)
  momoReturn: async (req, res) => {
    // MoMo trả query params, ví dụ resultCode, orderId, etc.
    return res.json({ success: true, query: req.query })
  },

  // MoMo IPN POST (server -> server)
  momoIpn: async (req, res) => {
    try {
      const data = req.body

      const { orderId, resultCode, transId, message } = data

      const payment = await Payment.findOne({ orderId })
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' })
      }

      if (resultCode === 0) {
        payment.status = 'paid'
        payment.momoTransId = transId
      } else {
        payment.status = 'failed'
      }

      await payment.save()

      return res.status(200).json({ message: 'IPN received' })
    } catch (err) {
      console.error('MoMo IPN error:', err)
      return res.status(500).json({ message: 'IPN error' })
    }
  },
  // VNPay return (user redirect)
  vnpayReturn: async (req, res) => {
    // VNPay trả query params - cần verify secure hash ở server (bạn nên kiểm tra)
    return res.json({ success: true, query: req.query })
  },

  // VNPay ipn or callback (if configured)
  vnpayIpn: async (req, res) => {
    // xử lý VNPay callback nếu bạn thiết lập
    return res.json({ success: true })
  },
}
