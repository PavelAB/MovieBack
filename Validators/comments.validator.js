const yup = require('yup')

const createCommentsValidator = yup.object({
    body: yup.string().trim().required(),
    Movie: yup.number().required(),
    User: yup.number().required()

})
const createLikeValidator = yup.object({
    Comment: yup.number().required(),
    User: yup.number().required()

})
module.exports = {createCommentsValidator, createLikeValidator}