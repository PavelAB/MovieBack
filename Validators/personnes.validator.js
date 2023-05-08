const yup = require('yup')

const createPersonnesValidator = yup.object({
    first_name: yup.string().max(50).trim().required(),
    last_name: yup.string().max(50).trim().required(),
    birth_date: yup.date(),
    job: yup.string().max(50).trim().required(),
    award_personne: yup.array(),
    WrittenMovie: yup.array(),
    ActedMovies: yup.array(),
    isDirector: yup.number()

})
module.exports = createPersonnesValidator