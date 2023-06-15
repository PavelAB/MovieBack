const yup = require('yup')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const createUsersValidator = yup.object({
    first_name: yup.string().max(50).trim().required(),
    last_name: yup.string().max(50).trim().required(),
    birth_date: yup.date().required(),
    login: yup.string().max(50).trim().required(),
    email: yup.string().max(50).trim().required().matches(emailRegex),
    password: yup.string().max(50).trim().required(),
    role: yup.string().max(50).trim().required()
})

const updateUsersValidator = yup.object({
    first_name: yup.string().max(50).trim(),
    last_name: yup.string().max(50).trim(),
    birth_date: yup.date(),
    email: yup.string().max(50).trim().matches(emailRegex),
    password: yup.string().max(50).trim()

})
module.exports = { createUsersValidator, updateUsersValidator }