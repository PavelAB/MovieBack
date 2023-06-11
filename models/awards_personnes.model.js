const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */



module.exports = ( sequelize ) => {
    const Awards_Personnes = sequelize.define('Awards_Personnes', {
        ID_Award_Personne: {
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
        tableName: 'Awards_Personnes'
    })
    return Awards_Personnes
}