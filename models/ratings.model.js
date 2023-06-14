const { Sequelize, DataTypes, INTEGER, ModelStatic } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns { ModelStatic<any> }
 */


module.exports = ( sequelize ) => {
    const Ratings = sequelize.define('Ratings', {
        ID_Rating: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rate_picture: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
                max: 10
            }
        },
        rate_actor_game: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        rate_cinematography: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        rate_sound: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        rate_writing: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        ID_Movie: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ID_User: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },{ 
        tableName: 'Ratings',
        indexes: [
            {
                unique: true,
                fields: ['ID_Movie', 'ID_User']
            }
        ]
    })
    return Ratings
}