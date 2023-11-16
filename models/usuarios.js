const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_tipousuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipousuario',
        key: 'id_tipousuario'
      }
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    contrasena: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    token_google: {
      type: DataTypes.STRING(1200),
      allowNull: true
    },
    celular: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    url_foto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_stripe_customer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    account_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    profile_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    token_password: {
      type: DataTypes.STRING(1200),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
