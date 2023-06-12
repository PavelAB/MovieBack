const yup = require('yup')

const createGenresValidator = yup.object({
    name_genre: yup.string().max(50).trim().required(),
    movie: yup.array()
})
const updateGenresValidator = yup.object({
    name_company: yup.string().max(50).trim(),
    movie: yup.array()
})
const removeMovieFromGenresValidator = yup.object({
    movie: yup.array()
})

module.exports = { createGenresValidator, updateGenresValidator, removeMovieFromGenresValidator}