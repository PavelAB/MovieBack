const { movieDTO, moviesListDTO } = require("../dto/movieDTO")
const db = require("../models")
const { Op } = require("sequelize");
const { NewSuccessResponse } = require("../utils/SuccessResponse");


const movieService = {
    /**
     * getAll - Service function that handles querying the database to retrieve all movies,
     * including pagination. Returns paginated results of movies.
     * 
     * @param {number} page - The current page number for pagination.
     * @param {number} limit - The number of results per page for pagination.
     * 
     * @returns {Promise<Object>} - Returns an object of type "NewSuccessResponse" containing:
     *   - `data` {Array<Object>} : List of paginated movie data objects.
     *   - `totalCount` {number} : Total number of movies.
     *   - `totalPages` {number} : Total number of pages based on the total count and limit.
     *   - `currentPage` {number} : Current page number based on the input.
     * 
     * @throws {Error} - Throws an error if the query fails or there is an issue retrieving the data.
     * 
     */
    getAll: async (page, limit) => {

        const offset = (page - 1) * limit

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [db.Ratings, db.Comments, db.Genres, db.Tags, db.Companies, db.Awards_Movies,
            { model: db.Personnes, as: "Actors", throught: 'MM_Staring_by_Personnes_Movies' },
            { model: db.Personnes, as: "Writers", throught: 'MM_Written_by_Personnes_Movies' },
            { model: db.Personnes, as: "Director", throught: 'Movies' }],
            distinct: true,
            limit,
            offset
        })

        const result = new NewSuccessResponse({
            data: rows.map(movie => new moviesListDTO(movie)),
            totalCount: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })


        return result
    },


     /**
     * getByTitle - Service function that handles querying the database with specific parameters,
     * including pagination and searching for a specific substring in movie titles. Returns paginated results of movies.
     * 
     * @param {number} page - The current page number for pagination.
     * @param {number} limit - The number of results per page for pagination.
     * @param {string} searchString - The substring used to search for movies by title.
     * 
     * @returns {Promise<Object>} - Returns an object of type "NewSuccessResponse" containing:
     *   - `data` {Array<Object>} : List of paginated movie data objects.
     *   - `totalCount` {number} : Total number of movies.
     *   - `totalPages` {number} : Total number of pages based on the total count and limit.
     *   - `currentPage` {number} : Current page number based on the input.
     * 
     * @throws {Error} - Throws an error if the query fails or there is an issue retrieving the data.
     * 
     */
    getByTitle: async (page, limit, searchString) => {

        const offset = (page - 1) * limit
        try {
            const { rows, count } = await db.Movies.findAndCountAll({
                where: {
                    title: {
                        [Op.like]: `%${searchString}%`
                    }
                },
                include: [db.Ratings, db.Comments, db.Genres, db.Tags, db.Companies, db.Awards_Movies,
                { model: db.Personnes, as: "Actors", throught: 'MM_Staring_by_Personnes_Movies' },
                { model: db.Personnes, as: "Writers", throught: 'MM_Written_by_Personnes_Movies' },
                { model: db.Personnes, as: "Director", throught: 'Movies' }],
                distinct: true,
                limit,
                offset
            })
            const result = new NewSuccessResponse({
                data: rows.map(movie => new moviesListDTO(movie)),
                totalCount: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            })

            return result

        } catch (error) {
            throw new Error(`Error : ${error.message}`);
        }
    },

    getById: async (id) => {
        const value = await db.Movies.findByPk(id, {
            include: [db.Ratings, db.Genres, db.Tags, db.Companies, db.Awards_Movies,
            { model: db.Comments, include: [
                {model: db.Users, attributes: ['first_name']}
            ]},
            { model: db.Personnes, as: "Actors", throught: 'MM_Staring_by_Personnes_Movies' },
            { model: db.Personnes, as: "Writers", throught: 'MM_Written_by_Personnes_Movies' },
            { model: db.Personnes, as: "Director", throught: 'Movies' }],
            distinct: true
        })
        // TODO Review the return of an element that has not been found; it currently returns 'null,' which is not acceptable.
        console.log("values", value)
        if (!value)
            return null
        const movie = new movieDTO(value)
        return movie
    },

    getByMultipleParamsTSG: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsTags = {}
        let whereConditionsCompanies = {}
        let whereConditionsGenres = {}
        // let whereConditionsPersonnes = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            console.log("key", key);
            if (key in db.Tags.rawAttributes) {
                whereConditionsTags = { ...whereConditionsTags, ...condition }
            } else if (key in db.Companies.rawAttributes) {
                whereConditionsCompanies = { ...whereConditionsCompanies, ...condition }
            } else if (key in db.Genres.rawAttributes) {
                whereConditionsGenres = { ...whereConditionsGenres, ...condition }
            }
            //  else if (key in db.Personnes.getAttributes()) {
            //     whereConditionsPersonnes = { ...whereConditionsPersonnes, ...condition }
            //     console.log('whereConditionsPersonnes', whereConditionsPersonnes)
            // }
        }


        if (Object.keys(whereConditionsCompanies).length === 0 &&
            Object.keys(whereConditionsGenres).length === 0 &&
            // Object.keys(whereConditionsPersonnes).length === 0 &&
            Object.keys(whereConditionsTags).length === 0) {
            return { values: [], count: 0 }
        }

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [
                {
                    model: db.Tags,
                    where: whereConditionsTags,
                    through: { attributes: [] },
                },
                {
                    model: db.Companies,
                    where: whereConditionsCompanies,
                    through: { attributes: [] },
                },
                {
                    model: db.Genres,
                    where: whereConditionsGenres,
                    through: { attributes: [] },
                },
                // {
                //     model: db.Personnes,
                //     as: 'Writers',
                //     where: whereConditionsPersonnes,
                //     through: { attributes: [] },
                // }
            ]
        });

        console.log(rows);
        const values = rows.map(itemMovie => new movieDTO(itemMovie))
        return {
            values, count
        }
    },

    getByParamsTestTSG: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsTags = {}
        let whereConditionsCompanies = {}
        let whereConditionsGenres = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            console.log("key", key);
            if (key in db.Tags.rawAttributes) {
                whereConditionsTags = { ...whereConditionsTags, ...condition }
            } else if (key in db.Companies.rawAttributes) {
                whereConditionsCompanies = { ...whereConditionsCompanies, ...condition }
                console.log(whereConditionsCompanies);
            } else if (key in db.Genres.rawAttributes) {
                whereConditionsGenres = { ...whereConditionsGenres, ...condition }
            }
        }

        console.log("afterKey");
        if (Object.keys(whereConditionsCompanies).length === 0 &&
            Object.keys(whereConditionsGenres).length === 0 &&
            Object.keys(whereConditionsTags).length === 0) {
            return { values: [], count: 0 }
        }
        console.log("afterIf");
        if (Object.keys(whereConditionsTags).length > 0) {
            const { rows, count } = await db.Movies.findAndCountAll({
                include: [
                    {
                        model: db.Tags,
                        where: whereConditionsTags,
                        through: { attributes: [] },
                    }]
            });
            console.log("TAGS");
            const values = rows.map(itemMovie => new movieDTO(itemMovie))
            return {
                values, count
            }
        } else if (Object.keys(whereConditionsGenres).length > 0) {
            const { rows, count } = await db.Movies.findAndCountAll({
                include: [
                    {
                        model: db.Genres,
                        where: whereConditionsGenres,
                        through: { attributes: [] },
                    }]
            })
            console.log('Genres');
            const values = rows.map(itemMovie => new movieDTO(itemMovie))
            return {
                values, count
            }

        } else if (Object.keys(whereConditionsCompanies).length > 0) {
            const { rows, count } = await db.Movies.findAndCountAll({
                include: [
                    {
                        model: db.Companies,
                        where: whereConditionsCompanies,
                        through: { attributes: [] },
                    }]
            });
            console.log("Companies");
            const values = rows.map(itemMovie => new movieDTO(itemMovie))
            return {
                values, count
            }
        }
    },

    getByWriter: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsWriters = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            if (key in db.Personnes.getAttributes()) {
                whereConditionsWriters = { ...whereConditionsWriters, ...condition }
            }
        }


        if (Object.keys(whereConditionsWriters).length === 0) {
            return { values: [], count: 0 }
        }

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [
                {

                    model: db.Personnes,
                    as: 'Writers',
                    where: whereConditionsWriters,
                    through: { attributes: [] },

                }
            ]
        });

        console.log(rows);
        const values = rows.map(itemMovie => new movieDTO(itemMovie))
        return {
            values, count
        }
    },

    getByActor: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsActors = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            if (key in db.Personnes.getAttributes()) {
                whereConditionsActors = { ...whereConditionsActors, ...condition }
            }
        }


        if (Object.keys(whereConditionsActors).length === 0) {
            return { values: [], count: 0 }
        }

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [
                {

                    model: db.Personnes,
                    as: 'Actors',
                    where: whereConditionsActors,
                    through: { attributes: [] },

                }
            ]
        });

        console.log(rows);
        const values2 = rows.map(itemMovie => new movieDTO(itemMovie))
        const count2 = count
        return {
            values2, count2
        }
    },

    getByTags: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsTags = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            if (key in db.Tags.rawAttributes) {
                whereConditionsTags = { ...whereConditionsTags, ...condition }
            }
        }


        if (Object.keys(whereConditionsTags).length === 0) {
            return { values: [], count: 0 }
        }

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [
                {
                    model: db.Tags,
                    where: whereConditionsTags,
                    through: { attributes: [] },
                }
            ]
        });

        console.log(rows);
        const values = rows.map(itemMovie => new movieDTO(itemMovie))
        return {
            values, count
        }
    },

    getByGenres: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsGenres = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            if (key in db.Genres.rawAttributes) {
                whereConditionsGenres = { ...whereConditionsGenres, ...condition }
            }
        }


        if (Object.keys(whereConditionsGenres).length === 0) {
            return { values: [], count: 0 }
        }

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [
                {
                    model: db.Genres,
                    where: whereConditionsGenres,
                    through: { attributes: [] },
                }
            ]
        });

        console.log(rows);
        const values = rows.map(itemMovie => new movieDTO(itemMovie))
        return {
            values, count
        }
    },

    getByAwards: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsAwards = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            if (key in db.Awards_Movies.getAttributes()) {
                whereConditionsAwards = { ...whereConditionsAwards, ...condition }
            }
        }


        if (Object.keys(whereConditionsAwards).length === 0) {
            return { values: [], count: 0 }
        }

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [
                {
                    model: db.Awards_Movies,
                    where: whereConditionsAwards
                }
            ]
        });

        console.log(rows);
        const values = rows.map(itemMovie => new movieDTO(itemMovie))
        return {
            values, count
        }
    },

    getByCompanies: async (data) => {
        console.log("data", data);
        if (Object.keys(data).length === 0) {
            return { values: [], count: 0 }
        }

        let whereConditionsCompanies = {}

        for (let key in data) {
            let condition = {}
            condition[key] = data[key]
            if (key in db.Companies.rawAttributes) {
                whereConditionsCompanies = { ...whereConditionsCompanies, ...condition }
            }
        }


        if (Object.keys(whereConditionsCompanies).length === 0) {
            return { values: [], count: 0 }
        }

        const { rows, count } = await db.Movies.findAndCountAll({
            include: [
                {
                    model: db.Companies,
                    where: whereConditionsCompanies,
                    through: { attributes: [] },
                }
            ]
        });

        console.log(rows);
        const values = rows.map(itemMovie => new movieDTO(itemMovie))
        return {
            values, count
        }
    },

    create: async (data) => {
        const transaction = await db.sequelize.transaction()
        let movie
        try {

            console.log(data)
            movie = await db.Movies.create(data)

            await movie.addGenres(data.genre, { transaction })
            await movie.addTag(data.tags, { transaction })
            await movie.addCompanies(data.company, { transaction })
            await movie.addAwards_Movies(data.award_movie, { transaction })
            await movie.addWriters(data.writer, { through: 'MM_Writen_by_Personnes_Movies', foreignKey: 'ID_Movie', otherKey: 'ID_Personne', transaction });
            await movie.addActors(data.actor, { through: 'MM_Staring_by_Personnes_Movies', foreignKey: 'ID_Movie', otherKey: 'ID_Personne', transaction });
            await movie.setDirector(data.director)

            await transaction.commit()

        } catch (error) {
            console.log(error)
            await transaction.rollback()
            return null
        }
        if (movie)
            return movie

    },

    update: async (id, data) => {

        console.log("data", data);

        const transaction = await db.sequelize.transaction()

        let updateMovie

        try {

            updateMovie = await db.Movies.update(data, {
                include: [db.Genres, db.Tags, db.Companies, db.Awards_Movies,
                { model: db.Personnes, as: "Actors", throught: 'MM_Staring_by_Personnes_Movies' },
                { model: db.Personnes, as: "Writers", throught: 'MM_Written_by_Personnes_Movies' },
                { model: db.Personnes, as: "Director", throught: 'Movies' }],
                where: {
                    ID_Movie: id
                }
            }, { transaction })

            const isMovieToUpdate = await db.Movies.findByPk(id, {
                include: [db.Genres, db.Tags, db.Companies, db.Awards_Movies,
                { model: db.Personnes, as: "Actors", throught: 'MM_Staring_by_Personnes_Movies' },
                { model: db.Personnes, as: "Writers", throught: 'MM_Written_by_Personnes_Movies' },
                { model: db.Personnes, as: "Director", throught: 'Movies' }],
            }, { transaction })

            await isMovieToUpdate.addTag(data.tags, { transaction })
            await isMovieToUpdate.addGenre(data.genre, { transaction })
            await isMovieToUpdate.addCompany(data.company, { transaction })
            await isMovieToUpdate.addAwards_Movies(data.award_movie, { transaction })

            await isMovieToUpdate.addActors(data.actor, { transaction })
            await isMovieToUpdate.addWriters(data.writer, { transaction })

            await transaction.commit()

        } catch (error) {
            await transaction.rollback()
            return false
        }

        return true
    },

    updateAvatar: async (id, filename) => {
        const data = {
            cover: `/images/covers/${filename}`
        }
        const updatedRow = await db.Movies.update(data, {
            where: {
                ID_Movie: id
            }
        })
        return updatedRow[0] === 1
    },

    removeTagsInMovie: async (id, data) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {

            const updateMovie = await db.Movies.findByPk(id, {
                include: [db.Tags]
            }, { transaction })

            affectedRows = await updateMovie.removeTags(data, { transaction })
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

    removeCompaniesInMovie: async (id, data) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {

            const updateMovie = await db.Movies.findByPk(id, {
                include: [db.Companies]
            }, { transaction })

            affectedRows = await updateMovie.removeCompany(data, { transaction })
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

    removeGenresInMovie: async (id, data) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {

            const updateMovie = await db.Movies.findByPk(id, {
                include: [db.Genres]
            }, { transaction })

            affectedRows = await updateMovie.removeGenre(data, { transaction })
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

    removeActorsInMovie: async (id, data) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {

            const updateMovie = await db.Movies.findByPk(id, {
                include: [
                    { model: db.Personnes, as: "Actors", throught: 'MM_Staring_by_Personnes_Movies' },
                ]
            }, { transaction })

            affectedRows = await updateMovie.removeActors(data, { transaction })
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

    removeWritersInMovie: async (id, data) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {

            const updateMovie = await db.Movies.findByPk(id, {
                include: [
                    { model: db.Personnes, as: "Writers", throught: 'MM_Written_by_Personnes_Movies' },
                ]
            }, { transaction })

            affectedRows = await updateMovie.removeWriters(data, { transaction })
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

    delete: async (id) => {

        const isDeleted = await db.Movies.findByPk(id)

        await db.Movies.destroy({
            where: {
                ID_Movie: id
            }
        })

        if (isDeleted)
            return true
        else
            return false
    },
}
module.exports = movieService 