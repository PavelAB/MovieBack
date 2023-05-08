const jsonwebtoken = require('jsonwebtoken')

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env

const jwt = {

    generate: ({ID_User, role}) => {
        return new Promise((resolve, reject) => {
            const payload = {   id: ID_User,
                                role }
            const secret = JWT_SECRET
            const options = {
                algorithm: 'HS256',
                expiresIn: '365d',
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            } 
            
            jsonwebtoken.sign(payload, secret, options, (error, token) => {
                if(error)
                    reject(error)
                resolve(token)
            })
        })
    },

    decode:(token) => {
        if(!token || token === '' )
            return Promise.reject('Pas de token')

        return new Promise((resolve, reject) => {
            const options = {
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            }

            jsonwebtoken.verify(token, JWT_SECRET, options, (error, payload) => {
                if(error)
                    reject(error)
                resolve(payload)
            })
        })
    }



}
module.exports = jwt