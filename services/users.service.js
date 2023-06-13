const db = require("../models")
const argon2 = require('argon2');
const {userDTO} = require('../dto/userDTO')


const userService = {
    getAll : async () => {
        const { rows, count } = await db.Users.findAndCountAll({
            include: [ db.Ratings ],
            distinct: true
        })
        const users = rows.map(user => new userDTO(user))
        return {
            users, count
        }

    },
    searchByLogin : async (login) => {
        console.log("I'm here");
        const thatLogin = await db.Users.findOne({
            where : {
                login : login
            }
        })
        console.log("I'm here2");
        console.log("thatLogin",thatLogin);
        if(thatLogin !== null){
            return true
        }
        else
            return false
    },
    searchByEmail : async (email) => {
        console.log("I'm here");
        const thatEmail = await db.Users.findOne({
            where : {
                email: email
            }
        })
        console.log("I'm here2");
        console.log("thatEmail",thatEmail);
        if(thatEmail !== null){
            return true
        }
        else
            return false
    },

    update : async () => {
        //TODO Faire l'update
    },
    create : async (data) => {
        try {
            const hash = await argon2.hash( data.password )
            data.password = hash
        } catch ( error ) {
            console.log( error );
        }
        
        const isCreated = await db.Users.create(data)
        if(isCreated)
            return true
        else
            return false

    },
    //TODO add methode addPicture
    delete : async (id) => {
       const isDeleted = await db.Users.findByPk(id)

       await db.Users.destroy({
        where:{
            ID_User: id
        }
       })

       if(isDeleted)
            return true
        else
            return false

    }
}
module.exports = userService 