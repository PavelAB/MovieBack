const yup = require('yup')

const createTagsValidator = yup.object({
    name_tag: yup.string().max(50).trim().required(),
    movie: yup.array()
})
const updateTagsValidator = yup.object({
    name_tag: yup.string().max(50).trim(),
    movie: yup.array()
})
const removeMovieFromTagsValidator = yup.object({
    movie: yup.array()
})
module.exports = { createTagsValidator, updateTagsValidator, removeMovieFromTagsValidator }