const express = require('express')
const { getTypeUserById, updateDataBilling, getDataBillingByUser } = require('../controllers/users')
const userRouter = express.Router()

userRouter.post('/type_user', getTypeUserById)

userRouter.put('/info_data', updateDataBilling)

userRouter.post('/info_data', getDataBillingByUser)

module.exports = userRouter