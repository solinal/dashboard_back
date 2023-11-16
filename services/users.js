const sequelize = require("../models/index.js").sequelize;
var initModels = require("../models/init-models");
const { getOrderDetailsByUser, createDetailsOrder, updateOrderDetailsByUser } = require("./orders.js");
var Usuarios = initModels(sequelize).usuarios;
var TipoUsuario = initModels(sequelize).tipousuario;

const getUserTypeByEmailUser = async (correo) => {
  const user = await Usuarios.findOne({
    where: { correo },
    attributes: {
      exclude: [
        "contrasena",
        "token_google",
        "id_stripe_customer",
        "account_name",
        "profile_name",
        "id_tipousuario",
        "url_foto",
        "token_password"
      ],
    },
    include: [
      { model: TipoUsuario, as: "id_tipousuario_tipousuario", required: true },
    ],
  });
  return user;
};

const getUserByEmail = async (correo) => {
  const user = await Usuarios.findOne({ where: { correo } })
  if (!user) {
    return null;
  }
  return user
}

const getDataUser = async (correo) => {
  const user = await getUserByEmail(correo)
  const user_order_details = await getOrderDetailsByUser(user);
  if(!user_order_details) {
    return null;
  }
  return user_order_details
};

const updateDataUser = async (correo, data) => {
  try {
    const user = await getUserByEmail(correo)
    if (!user) return null;
    const order_detail = await getOrderDetailsByUser(user);
    if (!order_detail) {
      const user_order_detail = await createDetailsOrder(user, data);
      return user_order_detail;
    }
    const user_update_order_detail = await updateOrderDetailsByUser(user, data);
    if (!user_update_order_detail) return null;
    return user_update_order_detail
  } catch (error) {
    throw new Error(error.message)
  }
};

module.exports = {
  getUserTypeByEmailUser,
  updateDataUser,
  getDataUser,
  getUserByEmail
};
