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
    getByID : async () => {

    },
    update : async () => {

    },
    create : async (data) => {
        const isCreated = await db.Ratings.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async () => {

    },
}
module.exports = ratingService 