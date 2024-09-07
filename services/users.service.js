const db = require("../models")
const argon2 = require('argon2');
const {userDTO} = require('../dto/userDTO')
const { Op } = require("sequelize");


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

    getByParams: async (data) => {

        const Variable_Test = [data]


        console.log('Variable_Test ', Variable_Test);

        const { rows, count } = await db.Users.findAndCountAll({
            include: [ ], 
            distinct: true,
            where: {
                [Op.and]: Variable_Test
            }
        })

        const values = rows.map( user => new userDTO(user))
        return {
            values, count
        }
    },

    searchByLogin : async (login) => {
        const thatLogin = await db.Users.findOne({
            where : {
                login : login
            }
        })
        if(thatLogin !== null){
            return true
        }
        else
            return false
    },
    searchByEmail : async (email) => {
        const thatEmail = await db.Users.findOne({
            where : {
                email: email
            }
        })
        if(thatEmail !== null){
            return true
        }
        else
            return false
    },

    update:async( id, data ) => {
        
        console.log("data", data);

        const transaction = await db.sequelize.transaction()
        
        let updateUser
        
        try {

            updateUser = await db.Users.update(data,{
                include: [  ], 
                where: {
                    ID_User : id
                }
            }, {transaction})

            await transaction.commit()
            
        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        
        return true
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

    updateAvatar: async (id, filename) => {
        const data = {
            picture : `/images/avatars/${filename}`
        }
        const updatedRow = await db.Users.update(data, {
            where: {
                ID_User : id
            }
        })
        return updatedRow[0] === 1
    },

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