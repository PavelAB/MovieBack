const yup = require('yup')

const createCompaniesValidator = yup.object({
    name_company: yup.string().max(50).trim().required(),
    movie: yup.array()
})
const updateCompaniesValidator = yup.object({
    name_company: yup.string().max(50).trim(),
    movie: yup.array()
})
const removeMovieFromCompaniesValidator = yup.object({
    movie: yup.array()
})
module.exports = { createCompaniesValidator, updateCompaniesValidator, removeMovieFromCompaniesValidator}