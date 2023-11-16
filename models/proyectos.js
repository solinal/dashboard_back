const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proyectos', {
    id_proyecto: {
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
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proyectos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "proyectos_pkey",
        unique: true,
        fields: [
          { name: "id_proyecto" },
        ]
      },
    ]
  });
};
