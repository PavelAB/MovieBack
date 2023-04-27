const { Sequelize } = require ('sequelize')

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD,{
    host:DB_SERVER,
    dialect:'mssql'
})


const db = {}
db.sequelize = sequelize;

db.Awards_Movies = require('./awards_movies.model')(sequelize)
db.Awards_Personnes = require('./awards_personnes.model')(sequelize)
//TODO cree le table Comments, Movies, Personnes, Ratings, Tags, Users, Genres, Companies


//TODO ajouter des liens ManyToMany Comments, Movies, Personnes, Ratings, Tags, Users, Genres, Companies
module.exports = db