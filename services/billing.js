const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var Order = initModels(sequelize).orden;
var OrderDetaills = initModels(sequelize).detalles_orden;
var Plan = initModels(sequelize).plan;

const generateBilling = async (user, typePlan, typeSub, subscriptionId) => {
    const sub_type = typeSub === "year" ? "ANUAL" : "MENSUAL"
    let q = `${typePlan} ${sub_type}`
    const plan = await Plan.findOne({ where: { nombre: q } })
    const orden_detail = await OrderDetaills.findOne({ where: { id_usuario: user.id_usuario } })
    console.log(sub_type.toLowerCase())
    const orden = new Order({
        id_usuario: user.id_usuario,
        id_plan: plan.id_plan,
        id_detalle_orden: orden_detail.id_detalle_orden,
        descripcion: `[${user.nombres} ${user.apellidos}] COMPRA DE ${q} ${new Date().toISOString()}`,
        comprado_en: new Date(),
        tipo_subscription: sub_type.toLowerCase(),
        id_stripe_subscription: subscriptionId
    })
    await orden.save()
}

const createOrdenDetailsForUser = async (user, empresa, direccion, cuidad, cedula) => {
    const order_detail = new OrderDetail({
        id_usuario: user.id,
        empresa,
        direccion,
        cuidad,
        cedula
    })
    await order_detail.save()
}

const getOrderByUserId = async (id_usuario) => {
    console.log(id_usuario)
    const user_order = await Order.findOne(
        { where: { id_usuario } }
    );
    if(!user_order) {
        return null;
    }
    return user_order
}

module.exports = {
    generateBilling,
    createOrdenDetailsForUser,
    getOrderByUserId
}