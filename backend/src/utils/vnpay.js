const crypto = require('crypto')
const qs = require('qs')
require('dotenv').config()

function formatDateVN() {
  const date = new Date()
  const pad = n => n.toString().padStart(2, '0')
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  )
}

const vnpConfig = {
  vnpUrl: process.env.VNP_PAYMENT_URL,
  tmnCode: process.env.VNP_TMNCODE,
  secretKey: process.env.VNP_HASHSECRET,
  returnUrl: process.env.VNP_RETURN_URL,
}

function sanitizeOrderInfo(orderInfo = '') {
  return (orderInfo || '')
    .replace(/[#%&?/]/g, '-') // thay ký tự đặc biệt gây lỗi
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu (tuỳ bạn có muốn)
    .trim()
}

function createVNPayUrl({ orderId, amount, ipAddr = '127.0.0.1', orderInfo = 'Thanh toan VNPay' }) {
  const createDate = formatDateVN()
  const tmnCode = vnpConfig.tmnCode
  const secretKey = vnpConfig.secretKey
  const vnpUrl = vnpConfig.vnpUrl
  const returnUrl = vnpConfig.returnUrl

  // safe values
  const safeOrderInfo = sanitizeOrderInfo(orderInfo)
  const safeOrderId = String(orderId).replace(/[^0-9A-Za-z]/g, '') || String(Date.now())

  let params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Amount: Number(amount) * 100,
    vnp_CurrCode: 'VND',
    vnp_TxnRef: safeOrderId,
    vnp_OrderInfo: safeOrderInfo,
    vnp_OrderType: 'other',
    vnp_Locale: 'vn',
    vnp_ReturnUrl: returnUrl,
    vnp_CreateDate: createDate,
    vnp_IpAddr: ipAddr,
  }

  // sort
  const sorted = {}
  Object.keys(params)
    .sort()
    .forEach(k => (sorted[k] = params[k]))

  // create sign on unencoded string
  const signDataRaw = qs.stringify(sorted, { encode: false })
  const secureHash = crypto
    .createHmac('sha512', secretKey)
    .update(Buffer.from(signDataRaw, 'utf-8'))
    .digest('hex')

  // build final query encoded for URL
  const finalQuery = qs.stringify(sorted, { encode: true })

  return `${vnpUrl}?${finalQuery}&vnp_SecureHash=${secureHash}`
}

module.exports = { createVNPayUrl }
