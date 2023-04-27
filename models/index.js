const { Sequelize } = require ('sequelize')

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD,{
    host:DB_SERVER,
    dialect:'mssql'
})


const db = {}
db.sequelize = sequelize;


// Tables
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

// Association ManyToMany
// TODO Changer les noms du colonnes dans les tables MM

// Movies - Genres
db.Movies.belongsToMany(db.Genres, { through: "MM_Has_Genres_Movies" , foreignKey: { name: "ID_Movie" }})
db.Genres.belongsToMany(db.Movies, { through: "MM_Has_Genres_Movies" , foreignKey: { name: "ID_Genre" }})

// Movies - Tags
db.Movies.belongsToMany(db.Tags, { through: 'MM_Characterize_Tags_Movies' , foreignKey: { name: "ID_Movie" }})
db.Tags.belongsToMany(db.Movies, { through: 'MM_Characterize_Tags_Movies' , foreignKey: { name: "ID_Tag" }})

// Movies - Companies
db.Movies.belongsToMany(db.Companies, { through: 'MM_Distributed_by_Companies_Movies' , foreignKey: { name: "ID_Movie" }})
db.Companies.belongsToMany(db.Movies, { through: 'MM_Distributed_by_Companies_Movies' , foreignKey: { name: "ID_Company" }})

// Movies - Personnes
db.Movies.belongsToMany(db.Personnes, { through: 'MM_Writen_by_Personnes_Movies' , foreignKey: { name: "ID_Movie" }})
db.Personnes.belongsToMany(db.Movies, { through: 'MM_Writen_by_Personnes_Movies' , foreignKey: { name: "ID_Personne" }})

// Movies - Personnes
db.Movies.belongsToMany(db.Personnes, { through: 'MM_Staring_by_Personnes_Movies' , foreignKey: { name: "ID_Movie" }})
db.Personnes.belongsToMany(db.Movies, { through: 'MM_Staring_by_Personnes_Movies' , foreignKey: { name: "ID_Personne" }})


// Association OneToMany

// Movies - Awards_Movies
db.Movies.hasMany(db.Awards_Movies)
db.Awards_Movies.belongsTo(db.Movies)

// Personnes - Awards_Personnes
db.Personnes.hasMany(db.Awards_Personnes)
db.Awards_Personnes.belongsTo(db.Personnes)

// Movies - Ratings
db.Movies.hasMany(db.Ratings)
db.Ratings.belongsTo(db.Movies)

// Users - Ratings
db.Users.hasMany(db.Ratings)
db.Ratings.belongsTo(db.Users)

// Movies - Comments
db.Movies.hasMany(db.Comments)
db.Comments.belongsTo(db.Movies)

// Users - Comments
db.Users.hasMany(db.Comments)
db.Comments.belongsTo(db.Users)


// Association OneToOne

// Personnes - Movies
db.Personnes.hasOne(db.Movies, { foreignKey: { name: 'directered_by'}})
db.Movies.belongsTo(db.Personnes, { foreignKey: { name: 'directered_by'}})


module.exports = db