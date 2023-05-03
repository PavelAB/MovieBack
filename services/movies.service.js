const movieDTO = require("../dto/movieDTO")
const db = require("../models")
const { Op, Model } = require("sequelize");


const movieService = {
    getAll : async () => {
        const { rows, count } = await db.Movies.findAndCountAll({
            include: [ db.Ratings, db.Comments, db.Genres, db.Tags, db.Companies, db.Awards_Movies,
            {model:db.Personnes, as: "Actors",throught:'MM_Staring_by_Personnes_Movies'},
            {model:db.Personnes, as: "Writers",throught:'MM_Written_by_Personnes_Movies'},
            {model:db.Personnes, as: "Director",throught:'Movies'}],
            distinct: true
        })
        const values = rows.map( company => new movieDTO(company) )
        return {
            values, count 
        }
    },
    create : async ( data ) => {
        const transaction = await db.sequelize.transaction()
        let movie
        try {

            console.log( data )
            movie = await db.Movies.create(data)

            await movie.addRatings( data.rating, { transaction })
            await movie.addComments( data.comment, { transaction } )
            await movie.addGenres( data.genre, { transaction })
            await movie.addTag( data.tags, {transaction})
            await movie.addCompanies( data.company, {transaction})
            await movie.addAwards_Movies( data.award_movie, {transaction})
            await movie.addWriters( data.writer, { through: 'MM_Writen_by_Personnes_Movies', foreignKey: 'ID_Movie', otherKey: 'ID_Personne', transaction });
            await movie.addActors( data.actor, { through: 'MM_Staring_by_Personnes_Movies', foreignKey: 'ID_Movie', otherKey: 'ID_Personne', transaction });
            await movie.setDirector( data.director)

            await transaction.commit()

        } catch ( error ) {
            console.log( error )
            await transaction.rollback()
            return null
        }
        if( movie )
            return movie

    },
    update : async () => {
        //TODO faire l'update
    },
    delete : async () => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false
    },
}
module.exports = movieService 