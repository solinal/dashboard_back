const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
var OrderDetails = initModels(sequelize).detalles_orden;
var Usuarios = initModels(sequelize).usuarios;

const createDetailsOrder = async (user, data) => {
    const detail_order = await OrderDetails.create({
        id_usuario: user.id_usuario,
        empresa: data.empresa,
        direccion: data.direccion,
        cuidad: data.cuidad,
        cedula: data.cedula,
    })
    return detail_order
}

const getOrderDetailsByUser = async (user) => {
    const user_details_orden = await OrderDetails.findOne({
        where: { id_usuario: user.id_usuario },
        include: [{ model: Usuarios, as: "usuario_detalles_orden", required: true,  attributes: {
            exclude: [
                "contrasena",
                "token_google",
                "id_stripe_customer",
                "account_name",
                "profile_name",
                "id_tipousuario",
                "token_password"
            ],
        },}]
    });
    return user_details_orden;
}

const updateOrderDetailsByUser = async (user, data) => {
    const user_order_details = await OrderDetails.update(
        {
            empresa: data.empresa,
            direccion: data.direccion,
            cuidad: data.cuidad,
            cedula: data.cedula,
            nombres: data.nombres,
            apellidos: data.apellidos,
            correo: data.email,
            telefono: data.telefono
        },
        { where: { id_usuario: user.id_usuario }, returning: true, plain: true }
    );
    if (!user_order_details) return null;
    return user_order_details;
}

module.exports = {
    createDetailsOrder,
    getOrderDetailsByUser,
    updateOrderDetailsByUser
}