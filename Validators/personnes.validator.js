const yup = require('yup')

const createPersonnesValidator = yup.object({
    first_name: yup.string().max(50).trim().required(),
    last_name: yup.string().max(50).trim().required(),
    birth_date: yup.date(),
    job: yup.string().max(50).trim().required(),
    award_personne: yup.number(),
    WrittenMovie: yup.array(),
    ActedMovies: yup.array(),
    isDirector: yup.number()

})
const updatePersonnesValidator = yup.object({
    first_name: yup.string().max(50).trim(),
    last_name: yup.string().max(50).trim(),
    birth_date: yup.date(),
    job: yup.string().max(50).trim(),
    award_personne: yup.number(),
    WrittenMovie: yup.array(),
    ActedMovies: yup.array(),
    isDirector: yup.number()

})
const removeActorsPersonnesValidator = yup.object({
    movie: yup.array()
})
const removeWritersPersonnesValidator = yup.object({
    movie: yup.array()
})
module.exports = { createPersonnesValidator, updatePersonnesValidator, removeActorsPersonnesValidator, removeWritersPersonnesValidator }