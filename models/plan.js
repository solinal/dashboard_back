const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('plan', {
        id_plan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'plan',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "plans_pkey",
                unique: true,
                fields: [
                    { name: "id_plan" },
                ]
            },
        ]
    });
};
