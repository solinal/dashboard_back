const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ingredientes_productos', {
    id_ingrediente_producto: {
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
    id_ingrediente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ingredientes',
        key: 'id_ingrediente'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ingredientes_productos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ingredientes_productos_pkey",
        unique: true,
        fields: [
          { name: "id_ingrediente_producto" },
        ]
      },
    ]
  });
};
