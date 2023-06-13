const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */



module.exports = ( sequelize ) => {
    const Companies = sequelize.define('Companies', {
        ID_Company: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_company: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    },{ 
        tableName: 'Companies'
    })
    return Companies
}