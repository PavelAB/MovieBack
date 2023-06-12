const yup = require('yup')

const createAwards_MoviesValidator = yup.object({
    type_award: yup.string().max(50).trim().required(),
    name_award: yup.string().max(50).trim().required(),
    year_award: yup.number().min(1900).max(2100).required(),
    ID_Movie: yup.number()


})
const updateAwards_MoviesValidator = yup.object({
    type_award: yup.string().max(50).trim(),
    name_award: yup.string().max(50).trim(),
    year_award: yup.number().min(1900).max(2100),
    ID_Movie: yup.number()


})
module.exports = { createAwards_MoviesValidator, updateAwards_MoviesValidator }