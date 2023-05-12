const yup = require('yup')

const createAwards_PersonnesValidator = yup.object({
    type_award: yup.string().max(50).trim().required(),
    name_award: yup.string().max(50).trim().required(),
    year_award: yup.number().positive().required(),
    award_personne: yup.array()


})
module.exports = createAwards_PersonnesValidator