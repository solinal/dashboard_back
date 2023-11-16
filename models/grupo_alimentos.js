const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupo_alimentos', {
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    grupo_alimentos: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'grupo_alimentos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grupo_alimentos_pkey",
        unique: true,
        fields: [
          { name: "codigo" },
        ]
      },
    ]
  });
};
