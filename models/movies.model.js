
const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */

//TODO Validation sur chaque colonne


module.exports = ( sequelize ) => {
    const Movies = sequelize.define('Movies', {
        ID_Movie: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{ 
        tableName: 'Movies'
    })
    return Movies
}