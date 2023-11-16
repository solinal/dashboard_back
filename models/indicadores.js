const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indicadores', {
    id_indicador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'indicadores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "indicadores_pkey",
        unique: true,
        fields: [
          { name: "id_indicador" },
        ]
      },
    ]
  });
};
