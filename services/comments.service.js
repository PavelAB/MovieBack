const commentDTO = require('../dto/commentDTO')
const { Op } = require("sequelize");
const db = require("../models")



const commentService = {
    getAll: async () => {
        const { rows, count } = await db.Comments.findAndCountAll({
            include: [
                { model: db.Movies, as: 'Movie' },
                { 
                    model: db.Users,
                    as: 'Comment',
                    through: db.MM_Users_Comments
                },
            ],
            distinct: true
        })
        return {
            comment: rows, count
        }
    },
    getByParams: async (data) => {

        const Variable_Test = [data]

        const { rows, count } = await db.Comments.findAndCountAll({
            include: [
                { model: db.Movies, as: 'Movie' },
                { 
                    model: db.Users,
                    as: 'Comment',
                    through: db.MM_Users_Comments
                },
            ],
            distinct: true,
            where: {
                [Op.and]: Variable_Test
            }
        })

        const values = rows.map(comment => new commentDTO(comment))
        return {
            values, count
        }
    },
    update: async () => {
        //TODO To begin, I assume that we cannot modify a comment.
    },

    /**
     * create - Service function that handles creating a comment in the database.
     * 
     * @param {Object} data - The object containing the new comment data.
     * @param {number} data.Users - The ID of the user creating the comment.
     * @param {number} data.Movies - The ID of the movie being commented on.
     * @param {number} data.body - The content of the comment.
     * 
     * @returns {boolean} - Returns true if the comment was successfully created.
     * 
     * @throws {Error} - Throws an error if the creation fails.
     * 
     */
    create: async (data) => {

        const transaction = await db.sequelize.transaction()
        
        let isCreated

        try {
            isCreated = await db.Comments.create(data, { transaction })

            const movie = await db.Movies.findByPk(data.Movies, { transaction })
            await isCreated.setMovie(movie, { transaction })

            const user = await db.Users.findByPk(data.Users, { transaction })
            await isCreated.setUser(user, { transaction })

            await transaction.commit()

        } catch (error) {
            await transaction.rollback()
            throw new Error(`Error : ${error.message}`)
        }
        
        return true
    },


    delete: async (id) => {
        const isDeleted = await db.Comments.findByPk(id)

        await db.Comments.destroy({
            where: {
                ID_Comment: id
            }
        })

        if (isDeleted)
            return true
        else
            return false
    },
}
module.exports = commentService 