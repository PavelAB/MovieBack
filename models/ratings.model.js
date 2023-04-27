const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */

//TODO Validation sur chaque colonne


module.exports = ( sequelize ) => {
    const Ratings = sequelize.define('Ratings', {
        ID_Rating: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rate_picture: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rate_actor_game: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rate_cinematography: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rate_sound: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rate_writing: {
            type: DataTypes.INTEGER,
            allowNull: false
        }


    },{ 
        tableName: 'Ratings'
    })
    return Ratings
}