const yup = require('yup')

const createRatingsValidator = yup.object({
    rate_picture: yup.number().positive().required(),
    rate_actor_gane: yup.number().positive().required(),
    rate_cinamatography: yup.number().positive().required(),
    rate_sound: yup.number().positive().required(),
    rate_writing: yup.number().positive().required()
    //TODO association avec des table movies et users
})
module.exports = createRatingsValidator