const yup = require('yup')

const createGenresValidator = yup.object({
    name_genre: yup.string().max(50).trim().required(),
    movie: yup.array()
})
module.exports = createGenresValidator