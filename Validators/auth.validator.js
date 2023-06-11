const yup = require('yup')
const userService = require('../services/users.service')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

yup.addMethod(yup.string, 'unique', function(message){
    return this.test('unique', message, function(value){
        return userService.searchByLogin(value)
            .then(searchResult => {
                console.log("searchResult",searchResult);
                if(searchResult){
                    throw new yup.ValidationError(message)
                }
                return true
            })
            .catch(error => {
                throw new yup.ValidationError('An error occurred during uniqueness validation')
            })
    })
})


const loginValidator = yup.object({
    login: yup.string().max(50).trim().required(),
    password: yup.string().max(50).trim().required()
})
const registerValidator = yup.object({
    first_name: yup.string().max(50).trim().required(),
    last_name: yup.string().max(50).trim().required(),
    birth_date: yup.date().required(),
    login: yup.string().max(50).trim().required().unique(),
    email: yup.string().max(50).trim().required().matches(emailRegex),
    password: yup.string().max(50).trim().required()
})
module.exports = {loginValidator, registerValidator}