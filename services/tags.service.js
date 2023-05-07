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
        const transaction = await db.sequelize.transaction()
        let isCreate
        try {

            isCreate = await db.Tags.create(data)
            await isCreate.addMovies(data.movie, {transaction})

            await transaction.commit()
            
        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if(isCreate)
            return true
    },
    delete : async () => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false

    },
}
module.exports = tagService 