const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */


//TODO Validation sur chaque colonne

module.exports = ( sequelize ) => {
    const Tags = sequelize.define('Tags', {
        ID_Tag: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_tag: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{ 
        tableName: 'Tags'
    })
    return Tags
}