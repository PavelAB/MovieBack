const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */




module.exports = ( sequelize ) => {
    const Awards_Movies = sequelize.define('Awards_Movies', {
        ID_Award_Movie: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_award: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name_award: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        year_award: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1900,
                max: 2100
            }
        }
    },{ 
        tableName: 'Awards_Movies'
    })
    return Awards_Movies
}