const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contenido_productos', {
    id_contenido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id_producto'
      }
    },
    id_indicador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'indicadores',
        key: 'id_indicador'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contenido_productos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "contenido_productos_pkey",
        unique: true,
        fields: [
          { name: "id_contenido" },
        ]
      },
    ]
  });
};
