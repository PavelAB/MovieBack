const commentDTO = require('/dto/commentDTO')
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
    getByID : async () => {

    },
    update : async () => {

    },
    create : async () => {
        const isCreated = await db.Comments.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async () => {

    },
}
module.exports = commentService 