const express = require('express')
const router = express.Router()
const paymentCtrl = require('../controllers/controllerPayment')

// create payment
router.post('/momo', paymentCtrl.createMoMo)
router.post('/vnpay', paymentCtrl.createVNPay)
router.post('/bank', paymentCtrl.createBank)
router.post('/cod', paymentCtrl.createCOD)

// return/ipn
router.get('/momo/return', paymentCtrl.momoReturn)
router.post('/momo/ipn', paymentCtrl.momoIpn)

router.get('/vnpay/return', paymentCtrl.vnpayReturn)
router.post('/vnpay/ipn', paymentCtrl.vnpayIpn)

module.exports = router
