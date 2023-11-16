const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('orden', {
        id_orden: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        comprado_en: {
            type: DataTypes.DATE,
            allowNull: true
        },
        tipo_subscripcion: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        id_detalle_orden: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'detalles_orden',
                key: 'id_detalle_orden'
            }
        },
        id_stripe_subscription: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario'
            }
        },
        id_plan: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'plan',
                key: 'id_plan'
            }
        },
    }, {
        sequelize,
        tableName: 'orden',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "ordenes_pkey",
                unique: true,
                fields: [
                    { name: "id_orden" },
                ]
            },
        ]
    });
};
