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
      const payUrl = momoResp.payUrl || momoResp.redirectUrl || momoResp.payUrl

      // optional: save to DB
      await Payment.create({
        orderType: req.body.orderType || 'online', // <== FIX BẮT BUỘC
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
      const { amount, orderInfo, ipAddr } = req.body
      const orderId = 'ORDER_' + Date.now()

      const vnpUrl = createVNPayUrl({ orderId, amount, ipAddr, orderInfo })

      await Payment.create({
        orderType: req.body.orderType || 'online',
        orderId,
        amount,
        orderInfo,
        method: 'vnpay',
        payUrl: vnpUrl,
      })

      return res.json({ success: true, payUrl: vnpUrl })
    } catch (err) {
      console.error('createVNPay error:', err)
      return res.status(500).json({ success: false, message: 'VNPay create error' })
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
      const body = req.body
      const orderId = body.orderId || body.orderId
      const resultCode = body.resultCode

      if (orderId) {
        const status = resultCode == 0 ? 'paid' : 'failed'
        await Payment.findOneAndUpdate({ orderId }, { status })
      }

      return res.json({ success: true })
    } catch (err) {
      console.error('momoIpn error:', err)
      return res.status(500).json({ success: false })
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
