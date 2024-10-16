const commentDTO = require("../dto/commentDTO");
const { Op } = require("sequelize");
const db = require("../models");
const { NewSuccessResponse } = require("../utils/SuccessResponse");

const commentService = {
    getAll: async () => {
        const { rows, count } = await db.Comments.findAndCountAll({
            include: [
                { model: db.Movies, as: "Movie" },
                {
                    model: db.Users,
                    as: "Comment",
                    through: db.MM_Users_Comments,
                },
            ],
            distinct: true,
        });
        return {
            comment: rows,
            count,
        };
    },

    /**
     * getByParams - Service function that handles querying the database with specific parameters, 
     * including pagination and data filtering. Returns paginated results of comments along 
     * with related movies, users, and a list of likes.
     * 
     * @param {Object} data - The search parameters used to filter the comments.
     * @param {number} [page = 1] - The current page number for pagination (default is 1).
     * @param {number} [limit = 10] - The number of results per page for pagination (default is 10).
     * 
     * @returns {Promise<NewSuccessResponse>} - Returns a "NewSuccessResponse" object containing:
     *   - `data` {Array<commentDTO>} : List of paginated comment data objects.
     *   - `totalCount` {number} : Total number of comments.
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
            const { rows, count } = await db.Comments.findAndCountAll({
                include: [
                    { 
                        model: db.Movies, 
                        as: "Movie",
                        attributes: ['ID_Movie', 'title'] 
                    },
                    {
                        model: db.Users,
                        as: "Comment",
                        through: {
                            model: db.MM_Users_Comments
                        }
                    },
                    {   
                        model: db.Users, as: "User",
                        attributes: ['first_name', 'last_name', 'login', 'ID_User' ] 

                    }
                ],
                distinct: true,
                limit,
                offset,
                where: {
                    [Op.and]: searchParams,
                }
            })
            const result = new NewSuccessResponse({
                data: rows.map((comment) => new commentDTO(comment)),
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })

            return result

        } catch (error) {
            throw new Error(`Error : ${error.message}`)
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
        const transaction = await db.sequelize.transaction();

        let isCreated;

        try {
            isCreated = await db.Comments.create(data, { transaction });

            const movie = await db.Movies.findByPk(data.Movies, { transaction });
            await isCreated.setMovie(movie, { transaction });

            const user = await db.Users.findByPk(data.Users, { transaction });
            await isCreated.setUser(user, { transaction });

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Error : ${error.message}`);
        }

        return true;
    },

    delete: async (id) => {
        const isDeleted = await db.Comments.findByPk(id);

        await db.Comments.destroy({
            where: {
                ID_Comment: id,
            },
        });

        if (isDeleted) return true;
        else return false;
    },
};
module.exports = commentService;
