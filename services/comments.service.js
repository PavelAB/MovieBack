const commentDTO = require("../dto/commentDTO");
const { Op, where } = require("sequelize");
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
     * getCommentUserMMByID - Service function that searches for an entry in `MM_Users_Comments` using `ID_Comment` and `ID_User`.
     * 
     * @param {Object} data - The object containing the data to search for an entry.
     * @param {number} data.ID_User - The ID of the user associated with the entry.
     * @param {number} data.ID_Comment - The ID of the comment being liked.
     * 
     * @returns {Object} - Returns the first matching `MM_Users_Comments` entry if found.
     * 
     * @throws {Error} - Throws an error if the creation fails.
    */
    getCommentUserMMByID: async (data) => {

        const searchParam = [data]

        try {
            
            const {rows} = await db.MM_Users_Comments.findAndCountAll({
                where: {
                    [Op.and]: searchParam
                }
            })

            return rows[0]

        } catch (error) {
            throw new Error(`Error : ${error.message}`)       
        }
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
     * @param {number} data.User - The ID of the user creating the comment.
     * @param {number} data.Movie - The ID of the movie being commented on.
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

            const movie = await db.Movies.findByPk(data.Movie, { transaction });
            await isCreated.setMovie(movie, { transaction });

            const user = await db.Users.findByPk(data.User, { transaction });
            await isCreated.setUser(user, { transaction });

            await transaction.commit()

            return true
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Error : ${error.message}`);
        }
    },


    /**
     * createLike - Service function that handles creating an entry in `MM_Users_Comments`.
     * 
     * @param {Object} data - The object containing the data to create an entry.
     * @param {number} data.User - The ID of the user creating the entry.
     * @param {number} data.Comment - The ID of the comment being liked.
     * 
     * @returns {boolean} - Returns true if the entry in `MM_Users_Comments` was successfully created.
     * 
     * @throws {Error} - Throws an error if the creation fails, or if the comment or user is not found.
    */
    createLike: async (data) => {
        const transaction = await db.sequelize.transaction()

        let isCreated

        try {
            
            const comment = await db.Comments.findByPk(data.Comment, { transaction })
            
            const user = await db.Users.findByPk(data.User, { transaction })

            if(!comment)
                throw new Error("Comment not found.")
            
            if(!user)
                throw new Error("User not found.")
            
            isCreated = await db.MM_Users_Comments.create({
                Like: true,
                ID_Comment: comment.ID_Comment,
                ID_User: user.ID_User

            }, { transaction })

            await transaction.commit()

        } catch (error) {
            await transaction.rollback()
            throw new Error(`Error : ${error.message}`)
        }
    }, 


    /**
     * updateLike - Service function that handles updating an entry in `MM_Users_Comments`.
     * 
     * @param {number} ID_Comment - The ID of the comment to be updated.
     * @param {number} ID_User - The ID of the user whose entry will be updated.
     * @param {boolean} like - The new like value to be set.
     * 
     * @returns {boolean} - Returns true if the entry in `MM_Users_Comments` was successfully updated.
     * 
     * @throws {Error} - Throws an error if the creation fails.
    */
    updateLike: async (ID_Comment, ID_User, like) => {

        const transaction = await db.sequelize.transaction()
        let updateCommentLike

        try {

            updateCommentLike = await db.MM_Users_Comments.update({Like: like},{
                where: {
                    ID_Comment: ID_Comment,
                    ID_User: ID_User
                }
            }, { transaction })

            await transaction.commit()

            return true
            
        } catch (error) {
            await transaction.rollback()
            throw new Error(`Error : ${error.message}`)
        }
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
