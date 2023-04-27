const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */


//TODO Validation sur chaque colonne

module.exports = ( sequelize ) => {
    const Companies = sequelize.define('Companies', {
        ID_Company: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_company: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{ 
        tableName: 'Companies'
    })
    return Companies
}