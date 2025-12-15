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
  const requestId = orderId
  const requestType = 'payWithMethod'
  const extraData = ''
  const orderGroupId = ''
  const autoCapture = true
  const lang = 'vi'

  // 🔐 RAW SIGNATURE (ĐÚNG CHUẨN MoMo)
  const rawSignature =
    `accessKey=${momoConfig.accessKey}` +
    `&amount=${amount}` +
    `&extraData=${extraData}` +
    `&ipnUrl=${momoConfig.ipnUrl}` +
    `&orderId=${orderId}` +
    `&orderInfo=${orderInfo}` +
    `&partnerCode=${momoConfig.partnerCode}` +
    `&redirectUrl=${momoConfig.redirectUrl}` +
    `&requestId=${requestId}` +
    `&requestType=${requestType}`

  const signature = crypto
    .createHmac('sha256', momoConfig.secretKey)
    .update(rawSignature)
    .digest('hex')

  const body = {
    partnerCode: momoConfig.partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId,
    amount: String(amount),
    orderId,
    orderInfo,
    redirectUrl: momoConfig.redirectUrl,
    ipnUrl: momoConfig.ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  }

  const resp = await axios.post(momoConfig.endpoint, body, { timeout: 15000 })
  return resp.data
}

module.exports = { createMoMoPayment }
