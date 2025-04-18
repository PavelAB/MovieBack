const { Request, Response } = require('express')
const { SuccessResponse, SuccesResponseMsg, NewSuccessResponse } = require('../utils/SuccessResponse')
const movieService = require('../services/movies.service')
const { ErrorResponse } = require('../utils/ErrorResponse')




//TODO Verifier le statusCode
const movieController = {
    /**
     * GetAll - Function to retrieve all movies from the database.
     * Also manages pagination and sends an appropriate response.
     * 
     * @param { Request } req - The request object, which contains query parameters including `limit`, `page`.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "NewSuccessResponse" with:
     *   - `data` {Array<Object>} : List of paginated movies.
     *   - `totalCount` {number} : Total number of movies.
     *   - `currentPage` {number} : Current page number.
     *   - `totalPages` {number} : Total number of pages.
     * 
     * @returns {JSON} 404 - Not Found: If no elements are found, returns an error message.
     * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */

    getAll: async (req, res) => {

        const { page = 1, limit = 10 } = req.query

        try {
            const result = await movieService.getAll(Number(page), Number(limit))

            if (result.data)
                res.status(200).json(result)
            else
                res.status(404).json(new ErrorResponse('The elements were not found.', 404))

        } catch (error) {
            res.status(500).json(new ErrorResponse(error.message, 500))
        }
    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async (req, res) => {
        // TODO I tried to retrieve a movie with a non-existent ID, and the backend crashed. This isn't good; it needs to be fixed.
        const id = req.params.ID_Movie
        const movie = await movieService.getById(id)

        if (movie)
            res.status(200).json(movie)
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * GetByTitle - Function to handle searching for movies that contain a specific substring in their title.
     * Also manages pagination and sends an appropriate response.
     * 
     * @param { Request } req - The request object, which contains query parameters including `limit`, `page`, and `searchString`.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "NewSuccessResponse" with:
     *   - `data` {Array<Object>} : List of paginated movies.
     *   - `totalCount` {number} : Total number of movies.
     *   - `currentPage` {number} : Current page number.
     *   - `totalPages` {number} : Total number of pages.
     * 
     * @returns {JSON} 404 - Not Found: If no elements are found, returns an error message.
     * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */

    getByTitle: async (req, res) => {
        const {page = 1, limit = 10, searchString = ""} = req.query

        try {
            const result = await movieService.getByTitle(Number(page), Number(limit), searchString)
            
            if (result.data)
                res.status(200).json(result)
            else
                res.status(404).json(new ErrorResponse('The elements were not found.', 404))
            
        } catch (error) {
            res.status(500).json(new ErrorResponse(error.message, 500)) 
        }
    },

    /**
     * GetByParams
     * @param { Request } req
     * @param { Response } res
     */
    getByParams: async (req, res) => {

        console.log(req.query);
        const { values, count } = await movieService.getByParamsTestTSG(req.query)

        if (values)
            if (values.length > 0)
                res.status(200).json(new SuccessResponse(values, count))
            else
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))


    },

    /**
     * getByPerson - Function to retrieve the movies associated with a specific person.
     * 
     * @param { Request } req - The request object, which contains the route parameter `ID_Person`.
     * @param { Response } res - The response object used to send the results or errors.
     * 
     * @returns {JSON} 200 - Success: An object "NewSuccessResponse" containing:
     *   - `data` {Array<Object>} : List of movies.
     *   - `totalCount` {number} : Total number of movies.
     *   - `currentPage` {number} : Current page number.
     *   - `totalPages` {number} : Total number of pages.
     * 
     * @returns {JSON} 500 - Internal Server Error: If an error occurs during the process, returns an error message with status code 500.
     */
    getByPerson: async (req, res) => {

        const personID = req.params.ID_Person

        try {
            const moviesList = await movieService.getByPersonId(personID)
            res.status(200).json(moviesList)
            
        } catch (error) {
            res.status(500).json(new ErrorResponse(error.message, 500))
        }

    },

    /**
     * GetByTags
     * @param { Request } req
     * @param { Response } res
     */
    getByTags: async (req, res) => {

        const { values, count } = await movieService.getByTags(req.query)

        if (values)
            if (values.length > 0)
                res.status(200).json(new SuccessResponse(values, count))
            else
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * GetByAwards
     * @param { Request } req
     * @param { Response } res
     */
    getByAwards: async (req, res) => {

        console.log(req.query);
        const { values, count } = await movieService.getByAwards(req.query)

        if (values)
            if (values.length > 0)
                res.status(200).json(new SuccessResponse(values, count))
            else
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * GetByCompanies
     * @param { Request } req
     * @param { Response } res
     */
    getByCompanies: async (req, res) => {

        console.log(req.query);
        const { values, count } = await movieService.getByCompanies(req.query)

        if (values)
            if (values.length > 0)
                res.status(200).json(new SuccessResponse(values, count))
            else
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * GetByGenres
     * @param { Request } req
     * @param { Response } res
     */
    getByGenres: async (req, res) => {

        console.log(req.query);
        const { values, count } = await movieService.getByGenres(req.query)

        if (values)
            if (values.length > 0)
                res.status(200).json(new SuccessResponse(values, count))
            else
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
    },

    /**
     * create
     * @param { Request } req
     * @param { Response } res
     */
    create: async (req, res) => {
        const data = req.body
        const isCreated = await movieService.create(data)

        if (isCreated)
            res.status(200).json(new SuccesResponseMsg('The element has been created.', 200))
        else
            res.status(400).json(new ErrorResponse('Error during creation.', 400))
    },

    /**
     * update
     * @param { Request } req
     * @param { Response } res
     */
    update: async (req, res) => {

        const id = req.params.ID_Movie
        const body = req.body

        const updateCompany = await movieService.update(id, body)

        if (updateCompany)
            res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))

    },

    /**
     * update Avatar
     * @param { Request } req
     * @param { Response } res
     */
    updateAvatar: async (req, res) => {
        console.log(req.file.filename);
        const id = req.params.ID_Movie
        console.log("id :", id);
        const filename = req.file.filename

        const updated = await movieService.updateAvatar(id, filename)
        if (!updated) {
            return res.sendStatus(400)
        }
        res.sendStatus(204)
    },

    /**
    * removeCompanies
    * @param { Request } req
    * @param { Response } res
    */
    removeCompanies: async (req, res) => {

        const id = req.params.ID_Movie
        const body = req.body.company

        const removeCompany = await movieService.removeCompaniesInMovie(id, body)
        if (removeCompany)
            if (removeCompany === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },

    /**
    * removeGenres
    * @param { Request } req
    * @param { Response } res
    */
    removeGenres: async (req, res) => {

        const id = req.params.ID_Movie
        const body = req.body.genres

        const removeGenres = await movieService.removeGenresInMovie(id, body)
        if (removeGenres)
            if (removeGenres === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },

    /**
    * removeActors
    * @param { Request } req
    * @param { Response } res
    */
    removeActors: async (req, res) => {

        const id = req.params.ID_Movie
        const body = req.body.actors

        const removeActors = await movieService.removeActorsInMovie(id, body)
        if (removeActors)
            if (removeActors === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },

    /**
    * removeWriters
    * @param { Request } req
    * @param { Response } res
    */
    removeWriters: async (req, res) => {

        const id = req.params.ID_Movie
        const body = req.body.writers

        const removeWriters = await movieService.removeWritersInMovie(id, body)
        if (removeWriters)
            if (removeWriters === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },

    /**
    * removeTags
    * @param { Request } req
    * @param { Response } res
    */
    removeTags: async (req, res) => {

        const id = req.params.ID_Movie
        const body = req.body.tags

        const removeTags = await movieService.removeTagsInMovie(id, body)
        if (removeTags)
            if (removeTags === 'NotInRange')
                res.status(200).json(new SuccesResponseMsg('The element to be removed is not found in the array.', 200))
            else
                res.status(200).json(new SuccesResponseMsg('The update is successful.', 200))
        else
            res.status(400).json(new ErrorResponse('An error occurred during the update.', 400))
    },

    /**
     * delete
     * @param { Request } req
     * @param { Response } res
     */
    delete: async (req, res) => {

        const id = req.params.ID_Movie
        const isDeleted = await movieService.delete(id)

        if (isDeleted)
            res.status(200).json(new SuccesResponseMsg("The element has been deleted.", 200))
        else
            res.status(404).json(new ErrorResponse("The element was not found.", 404))
    }
}
module.exports = movieController