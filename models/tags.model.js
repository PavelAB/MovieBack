const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */




module.exports = ( sequelize ) => {
    const Tags = sequelize.define('Tags', {
        ID_Tag: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_tag: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }

        }

    },{ 
        tableName: 'Tags'
    })
    return Tags
}