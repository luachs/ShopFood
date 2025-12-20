const QRCode = require('qrcode')
const axios = require('axios')

require('dotenv').config()

const bankInfo = {
  accountName: process.env.BANK_ACCOUNT_NAME || 'ShopFood',
  accountNumber: process.env.BANK_ACCOUNT_NUMBER || '123456789',
  bankName: process.env.BANK_NAME || 'DemoBank',
}

async function generateBankQR({ orderId, amount }) {
  const url = 'https://api.vietqr.io/v2/generate'

  const payload = {
    accountNo: bankInfo.accountNumber,
    accountName: bankInfo.accountName,
    acqId: 970436,
    amount,
    addInfo: orderId,
    template: 'compact',
  }

  const resp = await axios.post(url, payload)

  return {
    dataUrl: resp.data.data.qrDataURL, // ✅ quan trọng
    payload,
  }
}

module.exports = { generateBankQR, bankInfo }
