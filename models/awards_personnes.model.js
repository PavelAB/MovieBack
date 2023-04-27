const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */

//TODO Validation sur chaque colonne


module.exports = ( sequelize ) => {
    const Awards_Personnes = sequelize.define('Awards_Personnes', {
        ID_Award_Personne: {
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
            type: DataTypes.DATE,
            allowNull: false
        }
    },{ 
        tableName: 'Awards_Personnes'
    })
    return Awards_Personnes
}