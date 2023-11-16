const express = require('express');
const { checkoutPaymentSubscription, cancelSubscription, getInvoicesByCustomerUser } = require('../controllers/orders');
const { getUserTypeById, getUserByEmail } = require('../services/users');
const router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var Order = initModels(sequelize).orden;

// router.get('/orders/:id', async function (req, res) {
//     // try {
//         let id = req.params.id;
//         console.log(id)
//         const type = await getUserTypeById(id)
//         if (!type) {
//             return res.status(404).json({ message: "Not Found" });
//         }
//         return res.status(200).json({ type: type });
//     // } catch (error) {
//     //     return res.status(500).json({ message: error.message });
//     // }
// })

/*
ROUTE: /payment/checkout 
FOR VERIFY PAYMENT IN STRIPE
*/
router.post('/checkout', checkoutPaymentSubscription)

// router.post('/orders', async (req, res) => {
//     let { correo, plan_name } = req.body;
//     const user = await getUserByEmail(correo);
//     console.log(user)
//     const order_user = await Order.create({
//         id_usuario: user.id_usuario,
//         id_plan: 2,
//         id_detalle_orden: 1,
//         descripcion: `[${user.nombres} ${user.apellidos}] COMPRA DE ${plan_name} ${new Date().toISOString()}`,
//         comprado_en: new Date().toDateString(),
//         tipo_subscripcion: "mensual",
//         id_stripe_subscription: "cus_j9f39jf93$#$#F"
//     })
//     return res.status(200).json(order_user);
// });

router.post('/invoices', getInvoicesByCustomerUser)

/*
ROUTE: /payment/checkout 
CANCEL SUBSCRIPTION IN STRIPE
*/
router.post('/cancel', cancelSubscription)

module.exports = router
