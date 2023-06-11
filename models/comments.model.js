const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */


//TODO Validation sur chaque colonne

module.exports = ( sequelize ) => {
    const Comments = sequelize.define('Comments', {
        ID_Comment: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },{ 
        tableName: 'Comments'
    })
    return Comments
}