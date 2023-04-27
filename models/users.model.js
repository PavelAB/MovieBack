const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */


//TODO Validation sur chaque colonne

module.exports = ( sequelize ) => {
    const Users = sequelize.define('Users', {
        ID_Tag: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{ 
        tableName: 'Users'
    })
    return Users
}