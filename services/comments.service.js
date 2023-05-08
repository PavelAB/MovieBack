const commentDTO = require('../dto/commentDTO')
const { Op } = require("sequelize");
const db = require("../models")



const commentService = {
    getAll : async () => {
        const { rows, count } = await db.Comments.findAndCountAll({
            include: [ db.Movies, db.Users ],
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
        //TODO Modifier le create
        const isCreated = await db.Comments.create(data)
        if(isCreated)
            return true
        else
            return false
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