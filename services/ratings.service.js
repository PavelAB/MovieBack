const ratingDTO = require("../dto/ratingDTO")
const db = require("../models")
const { Op } = require("sequelize");
const { NewSuccessResponse } = require("../utils/SuccessResponse");


const ratingService = {
    getAll : async () => {
        const { rows, count } = await db.Ratings.findAndCountAll({
            include: [ 
                { model: db.Movies, as: 'Movie' },
                { model: db.Users, as: 'User' }
             ],
            distinct: true
        })
        const values = rows.map( rate => new ratingDTO(rate) )
        return {
            values, count 
        }
    },

    /**
     * getByParams - Service function that handles querying the database with specific parameters, 
     * including pagination and data filtering. Returns paginated results of ratings along with related movies and users.
     * 
     * @param {Object} data - The search parameters used to filter the ratings.
     * @param {number} [page = 1] - The current page number for pagination (default is 1).
     * @param {number} [limit = 10] - The number of results per page for pagination (default is 10).
     * 
     * @returns {Promise<Object>} - Returns an object of type "NewSuccessResponse" containing:
     *   - `data` {Array<Object>} : List of paginated rating data objects.
     *   - `totalCount` {number} : Total number of ratings.
     *   - `totalPages` {number} : Total number of pages based on the total count and limit.
     *   - `currentPage` {number} : Current page number based on the input.
     * 
     * @throws {Error} - Throws an error if the query fails or there is an issue retrieving the data.
     * 
     */
    getByParams: async (data, page = 1, limit = 10) => {

        const searchParams = [data]
        const offset = (page - 1) * limit

        try {
            const { rows, count } = await db.Ratings.findAndCountAll({
                include: [
                    { model: db.Movies, as: 'Movie' },
                    { model: db.Users, as: 'User' }
                ],
                distinct: true,
                limit,
                offset,
                where: {
                    [Op.and]: searchParams
               }
            })

            const result = new NewSuccessResponse({
                data: rows.map(rate => new ratingDTO(rate)),
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })
            return result
        } catch (error) {
            throw new Error(`Error : ${error.message}`)
        }
    },

    /**
     * update - Service function that handles updating a rating in the database.
     * 
     * @param {number} id - The ID of the rating being updated.
     * @param {Object} data - The object containing the updated rating data.
     * @param {number} data.rate_writing - The rating for writing.
     * @param {number} data.rate_sound - The rating for sound.
     * @param {number} data.rate_cinematography - The rating for cinematography.
     * @param {number} data.rate_actor_game - The rating for the actors' performance.
     * 
     * @returns {boolean} - Returns true if the rating was successfully updated.
     * 
     * @throws {Error} - Throws an error if the update fails.
     * 
     */
    update : async ( id, data ) => {

        const rating = {
            rate_writing: data.rate_writing,
            rate_sound: data.rate_sound,
            rate_cinematography: data.rate_cinematography,
            rate_actor_game: data.rate_actor_game,
            rate_picture: (data.rate_writing + data.rate_sound + data.rate_cinematography + data.rate_actor_game)/4 
        }

        const transaction = await db.sequelize.transaction()
        let updateRate

        try {
            updateRate = await db.Ratings.update(rating, {
                where: {
                    ID_Rating : id
                }
            },{transaction})

            await transaction.commit()
            
        } catch (error) {
            await transaction.rollback()
            return false
        }
        return true
    },



    /**
     * create - Service function that handles creating a rating in the database.
     * 
     * @param {Object} data - The object for created a new rating.
     * @param {number} data.User - The ID of the user creating the rating.
     * @param {number} data.Movie - The ID of the movie being rated.
     * @param {number} data.rate_writing - The rating for writing.
     * @param {number} data.rate_sound - The rating for sound.
     * @param {number} data.rate_cinematography - The rating for cinematography.
     * @param {number} data.rate_actor_game - The rating for the actors' performance.
     * 
     * @returns {boolean} - Returns true if the rating was successfully created.
     * 
     * @throws {Error} - Throws an error if the creation fails.
     * 
     */
    create : async (data) => {

        const rating = {
            ID_User: data.User,
            ID_Movie: data.Movie,
            rate_writing: data.rate_writing,
            rate_sound: data.rate_sound,
            rate_cinematography: data.rate_cinematography,
            rate_actor_game: data.rate_actor_game,
            rate_picture: (data.rate_writing + data.rate_sound + data.rate_cinematography + data.rate_actor_game)/4 
        }

        const transaction = await db.sequelize.transaction()
        let isCreated
        try {
            isCreated = await db.Ratings.create(rating, {transaction})
            const movie = await db.Movies.findByPk(rating.ID_Movie, { transaction })
            await isCreated.setMovie(movie, { transaction })
            const user = await db.Users.findByPk(rating.ID_User, {transaction})
            await isCreated.setUser(user, {transaction})
            await transaction.commit()

        } catch (error) {
            await transaction.rollback()
            throw new Error(`Error : ${error.message}`)
        }

        return true
    },
    delete : async (id) => {
        const isDeleted = await db.Ratings.findByPk(id)

        await db.Ratings.destroy({
            where: {
                ID_Rating: id
            }
        })

        if (isDeleted)
            return true
        else
            return false

    },
}
module.exports = ratingService 