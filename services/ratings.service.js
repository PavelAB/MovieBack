const ratingDTO = require("../dto/ratingDTO")
const db = require("../models")
const { Op } = require("sequelize");


const ratingService = {
    getAll : async () => {
        const { rows, count } = await db.Ratings.findAndCountAll({
            include: [ db.Movies ],
            distinct: true
        })
        const values = rows.map( rate => new ratingDTO(rate) )
        return {
            values, count 
        }
    },
    update : async () => {
        //TODO faire l'update
    },
    create : async (data) => {
        //TODO Modifier le create
        const isCreated = await db.Ratings.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async () => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false

    },
}
module.exports = ratingService 