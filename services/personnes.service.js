const db = require("../models")
const personneDTO = require("../dto/personneDTO")

const personneService = {
    getAll : async () => {
        //FIXME Ajouter les liens entre movies avec "as"
        const { rows, count } = await db.Personnes.findAndCountAll({
            include: [ db.Awards_Personnes],
            distinct: true
        })
        const values = rows.map( company => new personneDTO(company) )
        return {
            values, count 
        }
    },
    getByID : async () => {

    },
    update : async () => {
        //TODO faire l'update
    },
    create : async (data) => {
        const transaction = await db.sequelize.transaction()

        let isCreate
        try {
            isCreate = await db.Personnes.create(data)
            await isCreate.addAwards_Personnes(data.award_personne, {transaction} )
            await isCreate.addWrittenMovies(data.WrittenMovie, transaction )
            await isCreate.addActedMovies(data.ActedMovies, transaction )
            // Rechercher le film avec l'id passé en "isDirector", pour ensuite modifier le directeur depuis db.Movie.
            const movie = await db.Movies.findByPk(data.isDirector, { transaction });
            // Définir la personne comme directeur du film
            if(movie)
                await movie.setDirector(isCreate, { transaction });


            await transaction.commit()
        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if(isCreate)
            return true

    },
    delete : async () => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false

    },
}
module.exports = personneService 