const {genreDTO} = require("../dto/genreDTO")
const db = require("../models")
const { Op } = require("sequelize");


const genreService = {
    getAll: async () => {
        const { rows, count } = await db.Genres.findAndCountAll({
            include: [db.Movies],
            distinct: true
        })
        const values = rows.map(genre => new genreDTO(genre))
        return {
            values, count
        }
    },
    getByParams: async (data) => {

        const Variable_Test = [data]


        console.log('Variable_Test ', Variable_Test);

        const { rows, count } = await db.Genres.findAndCountAll({
            include: [db.Movies],
            distinct: true,
            where: {
                [Op.and]: Variable_Test
            }
        })

        const values = rows.map(genre => new genreDTO(genre))
        return {
            values, count
        }
    },

    update: async (id, data) => {

        const transaction = await db.sequelize.transaction()
        let updateGenre

        try {
            updateGenre = await db.Genres.update(data, {
                where: {
                    ID_Genre: id
                },
                include: [db.Movies]
            }, { transaction })

            const isGenreToUpdate = await db.Genres.findByPk(id, {
                include: [db.Movies]
            }, { transaction })

            await isGenreToUpdate.addMovie(data.movie, { transaction })
            await transaction.commit()

        } catch (error) {
            await transaction.rollback()
            return false
        }
        return true
    },

    removeMovieInGenre: async (id, data) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {

            const updateGenre = await db.Genres.findByPk(id, {
                include: [db.Movies]
            }, { transaction })

            affectedRows = await updateGenre.removeMovie(data, { transaction })
            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if (affectedRows === 0)
            return "NotInRange"
        else
            return true
    },

    create: async (data) => {
        const transaction = await db.sequelize.transaction()
        let isCreate
        
        try {

            isCreate = await db.Genres.create(data)
            await isCreate.addMovies(data.movie, { transaction })

            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if (isCreate)
            return true
    },

    delete: async (id) => {

        const isDeleted = await db.Genres.findByPk(id)

        await db.Genres.destroy({
            where: {
                ID_Genre: id
            }
        })
        console.log("isDeleted",isDeleted);
        if (isDeleted)
            return true
        else
            return false
    },
}
module.exports = genreService 