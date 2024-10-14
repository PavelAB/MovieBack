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


    getByParams: async (data, page = 1, limit = 10) => {

        console.log("Im here")
        const searchParams = [data];
        const offset = (page - 1) * limit;

        try {
            const { rows, count } = await db.Comments.findAndCountAll({
                include: [
                    { model: db.Movies, as: "Movie" },
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

            console.log("MM_comments ::::: > ", rows[0].dataValues.Comment[0].MM_Users_Comments)
            console.log("imhere2", rows[0])
            const result = new NewSuccessResponse({
                data: rows.map((comment) => new commentDTO(comment)),
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })

            console.log("result", result)

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
