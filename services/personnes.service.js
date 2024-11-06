const db = require("../models")
const { Op, Sequelize } = require("sequelize");
const personneDTO = require("../dto/personneDTO");
const { NewSuccessResponse } = require("../utils/SuccessResponse");

const personneService = {
    getAll : async () => {
        const { rows, count } = await db.Personnes.findAndCountAll({
            include: [ 
                db.Awards_Personnes,
                { model: db.Movies, as: "ActedMovies", through: 'MM_Staring_by_Personnes_Movies' },
                { model: db.Movies, as: "WrittenMovies", through: 'MM_Written_by_Personnes_Movies' },
                { model: db.Movies, as: "isDirector"} // changé de 'isDerector'
            ]
        })
        const values = rows.map( company => new personneDTO(company) )
        return {
            values, count 
        }
    },

    /**
     * getRandomPersonnes - Service function that returns a random selection of personnes based on their job type.
     * 
     * @param {number} [limit = 8] - The number of personnes to be returned (default is 8).
     * @param {string} [job = ""] - The job type filter, can be "Actor", "Director", or "Writer" (default is an empty string for no filter).
     * 
     * @returns {Promise<NewSuccessResponse>} - Returns a "NewSuccessResponse" object containing:
     *   - `data` {Array<Person>} : List of random personnes.
     *   - `totalCount` {number} : Total number of personnes matching the criteria.
     *   - `totalPages` {number} : Total number of pages.
     *   - `currentPage` {number} : Current page number.
     * 
     * @throws {Error} - Throws an error if the query fails or there is an issue retrieving the data.
     * 
     */
    getRandomPersonnes : async (limit = 8, job = "") => {
        const whereJobCondition = {}
        if(job){
            whereJobCondition.job = job
        }

        try {
            const {rows, count} = await db.Personnes.findAndCountAll({
                where: whereJobCondition,
                order: Sequelize.literal("NEWID()"),
                limit: limit,
                attributes: ["ID_Personne", "first_name", "last_name", "job" ,"picture"]
            })

            const result = NewSuccessResponse({
                data: rows,
                totalCount: count,
            })

            return result
            
        } catch (error) {
            throw new Error(`Error : ${error.message}`) 
        }

    },

    getByParams: async (data) => {

        console.log(data);
        if (data.first_name) {
            data.first_name = data.first_name.split(',')
        }
        if (data.last_name) {
            data.last_name = data.last_name.split(',')
        }
        if (data.job) {
            data.job = data.job.split(',')
        }

        const Variable_Test = [data]


        console.log('Variable_Test ', Variable_Test);

        const { rows, count } = await db.Personnes.findAndCountAll({
            include: [ 
                db.Awards_Personnes,
                { model: db.Movies, as: "ActedMovies", through: 'MM_Staring_by_Personnes_Movies' },
                { model: db.Movies, as: "WrittenMovies", through: 'MM_Written_by_Personnes_Movies' },
                { model: db.Movies, as: "isDirector" }
            ], 
            distinct: true,
            where: {
                [Op.and]: Variable_Test
            }
        })

        const values = rows.map(award => new personneDTO(award))
        return {
            values, count
        }
    },

    update:async( id, data ) => {
        
        console.log("data", data);

        const transaction = await db.sequelize.transaction()
        
        let updatePersonne
        
        try {

            updatePersonne = await db.Personnes.update(data,{
                include: [ 
                    db.Awards_Personnes,
                    { model: db.Movies, as: "ActedMovies", through: 'MM_Staring_by_Personnes_Movies' },
                    { model: db.Movies, as: "WrittenMovies", through: 'MM_Written_by_Personnes_Movies' },
                    { model: db.Movies, as: "isDirector"}
                ], 
                where: {
                    ID_Personne : id
                }
            }, {transaction})

            const isPersonneToUpdate = await db.Personnes.findByPk(id, {
                include: [ 
                    db.Awards_Personnes,
                    { model: db.Movies, as: "ActedMovies", through: 'MM_Staring_by_Personnes_Movies' },
                    { model: db.Movies, as: "WrittenMovies", through: 'MM_Written_by_Personnes_Movies' },
                    { model: db.Movies, as: "isDirector"}
                ], 
            }, {transaction})

            await isPersonneToUpdate.addAwards_Personne( data.award_personne, {transaction})
            
            await isPersonneToUpdate.addActedMovies( data.ActedMovie, {transaction})
            await isPersonneToUpdate.addWrittenMovies( data.WrittenMovie, {transaction})

            if(data.isDirector){
                const movie = await db.Movies.findByPk( data.isDirector, { transaction });
                    if(movie)
                        await movie.setDirector( isPersonneToUpdate, { transaction });
            }


            await transaction.commit()
            
        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        
        return true
    },

    updateAvatar: async (id, filename) => {
        const data = {
            picture : `/images/personnesCovers/${filename}`
        }
        const updatedRow = await db.Personnes.update(data, {
            where: {
                ID_Personne : id
            }
        })
        return updatedRow[0] === 1
    },

    removeMovieFromActors : async ( id, data ) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {
            
            const updatePersonne = await db.Personnes.findByPk( id, {
                include: [
                    { model: db.Movies, as: "ActedMovies", through: 'MM_Staring_by_Personnes_Movies' },
                ]
            }, {transaction})

            affectedRows = await updatePersonne.removeActedMovies( data, {transaction} )
            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if(affectedRows === 0)
            return "NotInRange"
        else
            return true
    },

    removeMovieFromWriters : async ( id, data ) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {
            
            const updatePersonne = await db.Personnes.findByPk( id, {
                include: [
                    { model: db.Movies, as: "WrittenMovies", through: 'MM_Written_by_Personnes_Movies' },
                ]
            }, {transaction})

            affectedRows = await updatePersonne.removeWrittenMovies( data, {transaction} )
            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if(affectedRows === 0)
            return "NotInRange"
        else
            return true
    },

    create : async (data) => {
        const transaction = await db.sequelize.transaction()

        let isCreate
        try {
            isCreate = await db.Personnes.create( data, {transaction} )
            await isCreate.addAwards_Personnes( data.award_personne, {transaction} )
            await isCreate.addWrittenMovies( data.WrittenMovie, transaction )
            await isCreate.addActedMovies( data.ActedMovies, transaction )
            // Rechercher le film avec l'id passé en "isDirector", pour ensuite modifier le directeur depuis db.Movie.
            const movie = await db.Movies.findByPk( data.isDirector, { transaction });
            // Définir la personne comme directeur du film
            if(movie)
                await movie.setDirector( isCreate, { transaction });


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
        const isDelete =  await db.Users.findByPk(id)
        await db.Users.destroy({
            where: {
                ID_User: id
            }
        })
        if(isDelete)
            return true
        else
            return false
        
    },
}
module.exports = personneService 