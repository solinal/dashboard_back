const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('administrador', {
    id_administrador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'administrador',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "administrador_pkey",
        unique: true,
        fields: [
          { name: "id_administrador" },
        ]
      },
    ]
  });
};
