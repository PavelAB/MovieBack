const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */

//TODO Validation sur chaque colonne


module.exports = ( sequelize ) => {
    const Awards_Movies = sequelize.define('Awards_Movies', {
        ID_Award_Movie: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_award: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        name_award: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        year_award: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{ 
        tableName: 'Awards_Movies'
    })
    return Awards_Movies
}