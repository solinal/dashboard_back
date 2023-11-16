const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipousuario', {
    id_tipousuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    plan: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipousuario',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tipousuario_pkey",
        unique: true,
        fields: [
          { name: "id_tipousuario" },
        ]
      },
    ]
  });
};
