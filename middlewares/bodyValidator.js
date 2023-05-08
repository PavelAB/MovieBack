const {ObjectSchema} = require('yup')
const { Request, Response } = require('express')

/**
 * 
 * @param {ObjectSchema} yupValidator
 */

const bodyValidator = (yupValidator) => {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async( req, res, next ) => {
        try {
            const isValid = await yupValidator.noUnknown().validate(req.body, { abortEarly: false })
            
            req.body = isValid

            next()
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
    }
}
module.exports = bodyValidator 