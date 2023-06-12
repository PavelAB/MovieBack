const yup = require('yup')

const createCommentsValidator = yup.object({
    body: yup.string().trim().required()
    //TODO user et movie associer
})
module.exports = createCommentsValidator