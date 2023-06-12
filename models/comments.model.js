const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */




module.exports = ( sequelize ) => {
    const Comments = sequelize.define('Comments', {
        ID_Comment: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    },{ 
        tableName: 'Comments'
    })
    return Comments
}