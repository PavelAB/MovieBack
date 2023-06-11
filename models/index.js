const { Sequelize } = require ('sequelize')

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize( DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_SERVER,
    dialect: 'mssql'
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
db.MM_Users_Comments = require('./mm_users_comment.model')(sequelize)


// Association ManyToMany

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
db.Movies.belongsToMany(db.Personnes, { through: 'MM_Writen_by_Personnes_Movies' , foreignKey: { name: "ID_Movie" },as: 'Writers'})
db.Personnes.belongsToMany(db.Movies, { through: 'MM_Writen_by_Personnes_Movies' , foreignKey: { name: "ID_Personne" },as: 'WrittenMovies'})

// Movies - Personnes
db.Movies.belongsToMany(db.Personnes, { through: 'MM_Staring_by_Personnes_Movies' , foreignKey: { name: "ID_Movie" },as: 'Actors'})
db.Personnes.belongsToMany(db.Movies, { through: 'MM_Staring_by_Personnes_Movies' , foreignKey: { name: "ID_Personne" },as: 'ActedMovies'})

// Users - Comments
db.Users.belongsToMany(db.Comments, { through: db.MM_Users_Comments , foreignKey: { name: "ID_User" },as: 'User'})
db.Comments.belongsToMany(db.Users, { through: db.MM_Users_Comments , foreignKey: { name: "ID_Comments" },as: 'Comment'})



// Association OneToMany

// Movies - Awards_Movies
db.Movies.hasMany(db.Awards_Movies, { foreignKey: { name: 'ID_Movie'}})
db.Awards_Movies.belongsTo(db.Movies, { foreignKey: { name: 'ID_Movie'}})

// Personnes - Awards_Personnes
db.Personnes.hasMany(db.Awards_Personnes, { foreignKey: { name: 'ID_Personne'}})
db.Awards_Personnes.belongsTo(db.Personnes, { foreignKey: { name: 'ID_Personne'}})

// Movies - Ratings
db.Movies.hasMany(db.Ratings, { foreignKey: { name: 'ID_Movie'}})
db.Ratings.belongsTo(db.Movies, { foreignKey: { name: 'ID_Movie'}})

// Users - Ratings
db.Users.hasMany(db.Ratings, { foreignKey: { name: 'ID_User'}})
db.Ratings.belongsTo(db.Users, { foreignKey: { name: 'ID_User'}})

// Movies - Comments
db.Movies.hasMany(db.Comments, { foreignKey: { name: 'ID_Movie'}})
db.Comments.belongsTo(db.Movies, { foreignKey: { name: 'ID_Movie'}})



// Association OneToOne

// Personnes - Movies
db.Personnes.hasOne(db.Movies, { foreignKey: { name: 'directered_by'},as: 'isDirector'})
db.Movies.belongsTo(db.Personnes, { foreignKey: { name: 'directered_by'}, as: 'Director'})


module.exports = db