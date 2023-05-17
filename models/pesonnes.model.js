const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */

//TODO Validation sur chaque colonne


module.exports = ( sequelize ) => {
    const Personnes = sequelize.define('Personnes', {
        ID_Personne: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        birth_date: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        picture:{
            type: DataTypes.STRING,
            allowNull: true
        },
        job: {
            type: DataTypes.STRING(50),
            allowNull: false
        }


    },{ 
        tableName: 'Personnes'
    })
    return Personnes
}