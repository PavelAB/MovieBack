const yup = require('yup')

const createCompaniesValidator = yup.object({
    name_company: yup.string().max(50).trim().required(),
    movie: yup.array()
})
module.exports = createCompaniesValidator