const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('detalles_orden', {
        id_detalle_orden: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        },
        correo: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        empresa: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        cuidad: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        cedula: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'detalles_orden',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "detalles_orden_pkey",
                unique: true,
                fields: [
                    { name: "id_detalle_orden" },
                ]
            },
        ]
    });
};
