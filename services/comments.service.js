const commentDTO = require('../dto/commentDTO')
const { Op } = require("sequelize");
const db = require("../models")



const commentService = {
    getAll : async () => {
        const { rows, count } = await db.Comments.findAndCountAll({
            include: [ 
                { model: db.Movies, as: 'Movie' },
                { model: db.Users, as: 'User' },
            ],
            distinct: true
        })
        const comment = rows.map( com => new commentDTO(com))
        return {
            comment, count 
        }
    },
    getByParams: async (data) => {

        const Variable_Test = [data]

        const { rows, count} = await db.Comments.findAndCountAll({
            include: [ db.Movies, db.Users ],
            distinct: true,
            where: {
                [ Op.and ]: Variable_Test
            }
        })

        const values = rows.map(comment => new commentDTO(comment))
        return { 
            values, count
        } 
    },
    update : async () => {
        //TODO Ajouter l'update
    },
    create : async (data) => {
        const transaction = await db.sequelize.transaction()
        let isCreated
        try {
            isCreated = await db.Comments.create(data)

            const movie = await db.Movies.findByPk(data.Movies, { transaction })
            await isCreated.setMovie(movie, { transaction })

            const user = await db.Users.findByPk(data.Users, {transaction})
            await isCreated.setUser(user, {transaction})
            
            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if(isCreated)
            return true
    },
    delete : async (id) => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false
        const isDeleted = await db.Comments.destroy({
            where:{
                ID_Comment : id
            }
        })
    },
}
module.exports = commentService 