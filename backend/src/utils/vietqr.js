const QRCode = require('qrcode')
require('dotenv').config()

const bankInfo = {
  accountName: process.env.BANK_ACCOUNT_NAME || 'ShopFood',
  accountNumber: process.env.BANK_ACCOUNT_NUMBER || '123456789',
  bankName: process.env.BANK_NAME || 'DemoBank',
}

async function generateBankQR({ orderId, amount }) {
  // Bạn có thể chuẩn hoá nội dung QR (ví dụ: nội dung chuyển khoản: ORDER_{id}|amount)
  const payload = `ACC:${bankInfo.accountNumber};NAME:${bankInfo.accountName};BANK:${bankInfo.bankName};ORDER:${orderId};AMOUNT:${amount}`
  const dataUrl = await QRCode.toDataURL(payload, { margin: 1, scale: 6 })
  return { dataUrl, payload }
}

module.exports = { generateBankQR, bankInfo }
