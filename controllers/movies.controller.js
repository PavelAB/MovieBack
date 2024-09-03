const { Request, Response } = require('express')
const { SuccessResponse, SuccesResponseMsg } = require('../utils/SuccessResponse')
const movieService = require('../services/movies.service')
const { ErrorResponse } = require('../utils/ErrorResponse')




//TODO Verifier le statusCode
const movieController = {
    /**
     * GetAll
     * @param { Request } req
     * @param { Response } res
     */
    getAll: async (req, res) => {
        const { values, count } = await movieService.getAll()
        console.log("coucou");
        if (values)
            res.status(200).json(new SuccessResponse(values, count))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))

    },

    /**
     * getByID
     * @param { Request } req
     * @param { Response } res
     */
    getByID: async (req, res) => {
        // TODO I tried to retrieve a movie with a non-existent ID, and the backend crashed. This isn't good; it needs to be fixed.
        const id = req.params.ID_Movie
        console.log(id);
        const movie = await movieService.getById(id)

        if (movie)
            res.status(200).json(movie)
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))
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
     * GetByPersonnes
     * @param { Request } req
     * @param { Response } res
     */
    getByPersonnes: async (req, res) => {

        console.log(req.query);
        const { values, count } = await movieService.getByWriter(req.query)

        const { values2, count2 } = await movieService.getByActor(req.query)

        //FIXME Sort based on the 'id_Movie' to avoid displaying the same movie twice.
        let fusion = [...values, ...values2]



        if (fusion)
            if (fusion.length > 0)
                res.status(200).json(new SuccessResponse(fusion, fusion.length))
            else
                res.status(200).json(new SuccesResponseMsg('The elements were not found.', 200))
        else
            res.status(400).json(new ErrorResponse('The elements were not found.', 400))


    },

    /**
     * GetByTags
     * @param { Request } req
     * @param { Response } res
     */
    getByTags: async (req, res) => {

        //console.log(req.query);
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
    removeWriters: async ( req, res ) => {

        const id = req.params.ID_Movie
        const body = req.body.writers

        const removeWriters = await movieService.removeWritersInMovie( id, body )
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