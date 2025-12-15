// utils/vnpay.js
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay')

const vnpay = new VNPay({
  tmnCode: 'BSCUX7JA',
  secureSecret: 'L45F2XVKM9IH35BY127PP9M5AAJ8J4YY',
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true,
  hashAlgorithm: 'SHA512',
  loggerFn: ignoreLogger,
})

function createVNPayUrl({ orderId, amount, ipAddr, orderInfo, orderType }) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return vnpay.buildPaymentUrl({
    vnp_TxnRef: orderId,
    vnp_Amount: amount,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType || ProductCode.Other,
    vnp_IpAddr: ipAddr || '127.0.0.1',

    // 🔥 QUAY VỀ FRONTEND ROOT
    vnp_ReturnUrl: process.env.VNP_RETURN_URL,

    vnp_Locale: VnpLocale.VN,
    vnp_CreateDate: dateFormat(new Date()),
    vnp_ExpireDate: dateFormat(tomorrow),
  })
}

module.exports = {
  createVNPayUrl,
}
