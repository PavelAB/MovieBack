const tagDTO = require('../dto/tagDTO')
const { Op } = require("sequelize");
const db = require("../models")

const tagService = {
    getAll : async () => {
        const { rows, count } = await db.Tags.findAndCountAll({
            include: [ db.Movies ],
            distinct: true
        })
        const values = rows.map( tag => new tagDTO(tag) )
        return {
            values, count 
        }
    },
    update : async () => {
        //TODO Faire l'update
    },
    create : async (data) => {
        //TODO Modifier le create
        const isCreated = await db.Tags.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async () => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false

    },
}
module.exports = tagService 