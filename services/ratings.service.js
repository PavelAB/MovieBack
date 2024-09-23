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
     * @param {number} page - The current page number for pagination.
     * @param {number} limit - The number of results per page for pagination.
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
    getByParams: async (data, page, limit) => {

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
            throw new Error(`Error : ${error.message}`);
        }
    },

    update : async ( id, data ) => {

        const transaction = await db.sequelize.transaction()
        let updateRate

        try {
            updateRate = await db.Ratings.update(data, {
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

    create : async (data) => {
        const transaction = await db.sequelize.transaction()
        let isCreated
        try {
            isCreated = await db.Ratings.create(data, {transaction})
            const movie = await db.Movies.findByPk(data.ID_Movie, { transaction })
            await isCreated.setMovie(movie, { transaction })
            const user = await db.Users.findByPk(data.ID_User, {transaction})
            await isCreated.setUser(user, {transaction})
            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }

        if(isCreated)
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