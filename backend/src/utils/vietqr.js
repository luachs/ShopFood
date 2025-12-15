const QRCode = require('qrcode')
require('dotenv').config()

const bankInfo = {
  accountName: process.env.BANK_ACCOUNT_NAME || 'ShopFood',
  accountNumber: process.env.BANK_ACCOUNT_NUMBER || '123456789',
  bankName: process.env.BANK_NAME || 'DemoBank',
}

async function generateVietQR({ orderId, amount }) {
  const url = `https://api.vietqr.io/v2/generate`

  const body = {
    accountNo: bankInfo.accountNumber,
    accountName: bankInfo.accountName,
    acqId: 970436, // Vietcombank
    amount,
    addInfo: orderId,
    template: 'compact',
  }

  const resp = await axios.post(url, body)
  return resp.data.data.qrDataURL
}

module.exports = { generateBankQR, bankInfo }
