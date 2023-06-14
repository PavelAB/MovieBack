const yup = require('yup')

const createMoviesValidator = yup.object({
    title: yup.string().max(50).trim().required(),
    cover: yup.string().max(200).trim().required(),
    release_date: yup.date(),
    genre: yup.array(),
    tags: yup.array(),
    company: yup.array(),
    award_movie: yup.number(),
    writer: yup.array(),
    actor: yup.array(),
    director: yup.number()
})

const updateMoviesValidator = yup.object({
    title: yup.string().max(50).trim(),
    cover: yup.string().max(200).trim(),
    release_date: yup.date(),
    genre: yup.array(),
    tags: yup.array(),
    company: yup.array(),
    award_movie: yup.number(),
    writer: yup.array(),
    actor: yup.array(),
    directered_by: yup.number()
})

const  removeTagsValidator = yup.object({
    tags: yup.array()
})
const  removeCompaniesValidator = yup.object({
    company: yup.array()
})
const  removeGenresValidator = yup.object({
    genres: yup.array()
})
const  removeActorsValidator = yup.object({
    actors: yup.array()
})
const  removeWritersValidator = yup.object({
    writers: yup.array()
})
module.exports = { createMoviesValidator, updateMoviesValidator, removeActorsValidator, removeCompaniesValidator, removeGenresValidator, removeTagsValidator, removeWritersValidator}