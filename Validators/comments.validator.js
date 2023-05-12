const yup = require('yup')

const createCommentsValidator = yup.object({
    body: yup.string().trim().required(),
    like_comment: yup.number(),
    dislike_comment: yup.number()
    //TODO user et movie associer
})
module.exports = createCommentsValidator