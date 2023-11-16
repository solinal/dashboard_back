const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ingredientes', {
    id_ingrediente: {
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
    tableName: 'ingredientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ingredientes_pkey",
        unique: true,
        fields: [
          { name: "id_ingrediente" },
        ]
      },
    ]
  });
};
