const yup = require('yup')

const createMoviesValidator = yup.object({
    title: yup.string().max(50).trim().required(),
    cover: yup.string().max(200).trim().required(),
    release_date: yup.date(),
    rating: yup.array(),
    comment: yup.array(),
    genre: yup.array(),
    tags: yup.array(),
    company: yup.array(),
    award_movie: yup.array(),
    writer: yup.array(),
    actor: yup.array(),
    director: yup.array()
})
module.exports = createMoviesValidator