const yup = require('yup')

const createUsersValidator = yup.object({
    first_name: yup.string().max(50).trim().required(),
    last_name: yup.string().max(50).trim().required(),
    birth_date: yup.date().required(),
    login: yup.string().max(50).trim().required(),
    email: yup.string().max(50).trim().required(),
    password: yup.string().max(50).trim().required(),
    role: yup.string().max(50).trim().required()
})
module.exports = createUsersValidator