const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proyectos',
        key: 'id_proyecto'
      }
    }
  }, {
    sequelize,
    tableName: 'productos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "productos_pkey",
        unique: true,
        fields: [
          { name: "id_producto" },
        ]
      },
    ]
  });
};
