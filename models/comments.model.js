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
        boby: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        like_comment: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        dislike_comment: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    },{ 
        tableName: 'Comments'
    })
    return Comments
}