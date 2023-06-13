const yup = require('yup')

const createCommentsValidator = yup.object({
    body: yup.string().trim().required(),
    Movies: yup.number().required(),
    Users: yup.number().required()

})
module.exports = createCommentsValidator