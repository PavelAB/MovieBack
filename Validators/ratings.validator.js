const yup = require('yup')

const createRatingsValidator = yup.object({
    rate_picture: yup.number().min(0).max(10),
    rate_actor_game: yup.number().required().min(0).max(10),
    rate_cinematography: yup.number().required().min(0).max(10),
    rate_sound: yup.number().required().min(0).max(10),
    rate_writing: yup.number().required().min(0).max(10),
    Movie: yup.number().required(),
    User: yup.number().required()
})
const updateRatingsValidator = yup.object({
    rate_picture: yup.number().min(0).max(10),
    rate_actor_game: yup.number().min(0).max(10),
    rate_cinematography: yup.number().min(0).max(10),
    rate_sound: yup.number().min(0).max(10),
    rate_writing: yup.number().min(0).max(10)
})
module.exports = { createRatingsValidator, updateRatingsValidator}