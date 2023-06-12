const { Sequelize, DataTypes, INTEGER } = require ('sequelize');

/**
 * @param { Sequelize } sequelize
 * @returns {}
 */



module.exports = ( sequelize ) => {
    const Genres = sequelize.define('Genres', {
        ID_Genre: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    },{ 
        tableName: 'Genres'
    })
    return Genres
}