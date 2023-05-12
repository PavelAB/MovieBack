const yup = require('yup')

const createTagsValidator = yup.object({
    name_tag: yup.string().max(50).trim().required(),
    movie: yup.array()
})
module.exports = createTagsValidator