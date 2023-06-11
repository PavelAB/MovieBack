const { Sequelize, DataTypes } = require("sequelize")

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */

module.exports = ( sequelize ) => {
    const MM_Users_Comments = sequelize.define('MM_Users_Comments', {
        isLike : {
            type : DataTypes.BOOLEAN,
            allowNull : true,
            defaultValue : false
        },
        isDislike : {
            type : DataTypes.BOOLEAN,
            allowNull : true,
            defaultValue : false
        }
    },{
        tableName: 'MM_Users_Comments'
    })
    return MM_Users_Comments
}

