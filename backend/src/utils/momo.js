const axios = require('axios')
const crypto = require('crypto')
require('dotenv').config()

const momoConfig = {
  endpoint: 'https://test-payment.momo.vn/v2/gateway/api/create',
  partnerCode: process.env.MOMO_PARTNER_CODE,
  accessKey: process.env.MOMO_ACCESS_KEY,
  secretKey: process.env.MOMO_SECRET_KEY,
  redirectUrl: process.env.MOMO_REDIRECT_URL,
  ipnUrl: process.env.MOMO_IPN_URL,
}

async function createMoMoPayment({ orderId, amount, orderInfo }) {
  const requestId = String(Date.now())
  const rawSignature =
    `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=&ipnUrl=${momoConfig.ipnUrl}` +
    `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${momoConfig.partnerCode}` +
    `&redirectUrl=${momoConfig.redirectUrl}&requestId=${requestId}&requestType=captureWallet`

  const signature = crypto
    .createHmac('sha256', momoConfig.secretKey)
    .update(rawSignature)
    .digest('hex')

  const body = {
    partnerCode: momoConfig.partnerCode,
    accessKey: momoConfig.accessKey,
    requestId,
    amount: String(amount),
    orderId,
    orderInfo,
    redirectUrl: momoConfig.redirectUrl,
    ipnUrl: momoConfig.ipnUrl,
    extraData: '',
    requestType: 'captureWallet',
    signature,
    lang: 'vi',
  }

  const resp = await axios.post(momoConfig.endpoint, body, { timeout: 10000 })
  return resp.data // contains payUrl
}

module.exports = { createMoMoPayment }
