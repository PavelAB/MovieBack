const argon2 = require('argon2');
const db = require('../models');
const jwt = require('../utils/jwt.utils');
const { UserDTOToken } = require('../dto/userDTO');

const authService = {
    register: async( data ) => {
        try {
            const hash = await argon2.hash( data.password )
            data.password = hash
        } catch ( error ) {
            console.log( error );
        }
        const newUser = await db.Users.create( data )
        const token = await jwt.generate( newUser )

        if(newUser){
            return new UserDTOToken( newUser, token )
        }
        return null
    },
    login: async ( login, password ) => {
        console.log(login);
        const user = await db.Users.findOne({
            where: {
                login
            }
        })
        console.log(user);
        if( !user )
            return null
        try {
            if( await argon2.verify(user.password, password))
                return user
            else
                return null
        } catch ( error ) {
            console.log(error)
        }
    }
}
module.exports = authService