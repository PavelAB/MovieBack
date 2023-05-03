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
    getByID : async () => {

    },
    update : async () => {

    },
    create : async (data) => {
        const isCreated = await db.Tags.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async () => {

    },
}
module.exports = tagService 