const { Sequelize } = require ('sequelize')

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD,{
    host:DB_SERVER,
    dialect:'mssql'
})


const db = {}
db.sequelize = sequelize;


//Create Tables
db.Awards_Movies = require('./awards_movies.model')(sequelize)
db.Awards_Personnes = require('./awards_personnes.model')(sequelize)
db.Comments = require('./comments.model')(sequelize)
db.Movies = require('./movies.model')(sequelize)
db.Personnes = require('./pesonnes.model')(sequelize)
db.Ratings = require('./ratings.model')(sequelize)
db.Tags = require('./tags.model')(sequelize)
db.Users = require('./users.model')(sequelize)
db.Genres = require('./genres.model')(sequelize)
db.Companies = require('./companies.model')(sequelize)

//Create Association ManyToMany
//TODO Changer les noms du colonnes dans les tables MM

//Movies-Genres
db.Movies.belongsToMany(db.Genres, { through: 'MM_Has_Genres_Movies'})
db.Genres.belongsToMany(db.Movies, { through: 'MM_Has_Genres_Movies'})

//Movies-Tags
db.Movies.belongsToMany(db.Tags, { through: 'MM_Characterize_Tags_Movies'})
db.Tags.belongsToMany(db.Movies, { through: 'MM_Characterize_Tags_Movies'})

//Movies-Companies
db.Movies.belongsToMany(db.Companies, { through: 'MM_Distributed_by_Companies_Movies'})
db.Companies.belongsToMany(db.Movies, { through: 'MM_Distributed_by_Companies_Movies'})

//Movies-Personnes
db.Movies.belongsToMany(db.Personnes, { through: 'MM_Writen_by_Personnes_Movies'})
db.Personnes.belongsToMany(db.Movies, { through: 'MM_Writen_by_Personnes_Movies'})

//Movies-Personnes
db.Movies.belongsToMany(db.Personnes, { through: 'MM_Staring_by_Personnes_Movies'})
db.Personnes.belongsToMany(db.Movies, { through: 'MM_Staring_by_Personnes_Movies'})






//Create Association OneToMany

//Create Association OneToOne


//TODO ajouter des liens ManyToMany Comments, Movies, Personnes, Ratings, Tags, Users, Genres, Companies
module.exports = db