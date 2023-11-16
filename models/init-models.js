var DataTypes = require("sequelize").DataTypes;
var _administrador = require("./administrador");
var _contenido_productos = require("./contenido_productos");
var _grupo_alimentos = require("./grupo_alimentos");
var _indicadores = require("./indicadores");
var _ingredientes = require("./ingredientes");
var _ingredientes_productos = require("./ingredientes_productos");
var _productos = require("./productos");
var _proyectos = require("./proyectos");
var _tipousuario = require("./tipousuario");
var _usuarios = require("./usuarios");
var _orden = require("./orders");
var _plan = require("./plan");
var _detalles_orden = require("./detalles_orden");

function initModels(sequelize) {
  var administrador = _administrador(sequelize, DataTypes);
  var contenido_productos = _contenido_productos(sequelize, DataTypes);
  var grupo_alimentos = _grupo_alimentos(sequelize, DataTypes);
  var indicadores = _indicadores(sequelize, DataTypes);
  var ingredientes = _ingredientes(sequelize, DataTypes);
  var ingredientes_productos = _ingredientes_productos(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var proyectos = _proyectos(sequelize, DataTypes);
  var tipousuario = _tipousuario(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var orden = _orden(sequelize, DataTypes);
  var plan = _plan(sequelize, DataTypes);
  var detalles_orden = _detalles_orden(sequelize, DataTypes);

  contenido_productos.belongsTo(indicadores, { as: "id_indicador_indicadore", foreignKey: "id_indicador" });
  indicadores.hasMany(contenido_productos, { as: "contenido_productos", foreignKey: "id_indicador" });
  ingredientes_productos.belongsTo(ingredientes, { as: "id_ingrediente_ingrediente", foreignKey: "id_ingrediente" });
  ingredientes.hasMany(ingredientes_productos, { as: "ingredientes_productos", foreignKey: "id_ingrediente" });
  contenido_productos.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto" });
  productos.hasMany(contenido_productos, { as: "contenido_productos", foreignKey: "id_producto" });
  ingredientes_productos.belongsTo(productos, { as: "id_producto_producto", foreignKey: "id_producto" });
  productos.hasMany(ingredientes_productos, { as: "ingredientes_productos", foreignKey: "id_producto" });
  productos.belongsTo(proyectos, { as: "id_proyecto_proyecto", foreignKey: "id_proyecto" });
  proyectos.hasMany(productos, { as: "productos", foreignKey: "id_proyecto" });
  usuarios.belongsTo(tipousuario, { as: "id_tipousuario_tipousuario", foreignKey: "id_tipousuario" });
  tipousuario.hasMany(usuarios, { as: "usuarios", foreignKey: "id_tipousuario" });
  administrador.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario" });
  usuarios.hasMany(administrador, { as: "administradors", foreignKey: "id_usuario" });
  proyectos.belongsTo(usuarios, { as: "id_usuario_usuario", foreignKey: "id_usuario" });
  usuarios.hasMany(proyectos, { as: "proyectos", foreignKey: "id_usuario" });
  plan.hasMany(orden, { as: "plan_orden", foreignKey: "id_plan" });
  usuarios.hasMany(orden, { as: "usuarios_orden", foreignKey: "id_usuario" });
  detalles_orden.hasMany(orden, { as: "detalles_orden", foreignKey: "id_detalle_orden" });
  usuarios.hasMany(detalles_orden, { as: "detalles_orden_usuario", foreignKey: "id_usuario" });
  detalles_orden.belongsTo(usuarios, { as: "usuario_detalles_orden", foreignKey: "id_usuario" });
  orden.belongsTo(usuarios, { as: "orden_usuario", foreignKey: "id_usuario" });
  orden.belongsTo(plan, { as: "orden_plan", foreignKey: "id_plan" })
  orden.belongsTo(detalles_orden, { as: "orden_detalles", foreignKey: "id_detalle_orden" })

  return {
    administrador,
    contenido_productos,
    grupo_alimentos,
    indicadores,
    ingredientes,
    ingredientes_productos,
    productos,
    proyectos,
    tipousuario,
    usuarios,
    orden,
    plan,
    detalles_orden
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
