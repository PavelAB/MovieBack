const db = require("../models")
const personneDTO = require("../dto/personneDTO")

const personneService = {
    getAll : async () => {
        const { rows, count } = await db.Personnes.findAndCountAll({
            include: [ db.Movies ],
            distinct: true
        })
        const values = rows.map( company => new personneDTO(company) )
        return {
            values, count 
        }
    },
    getByID : async () => {

    },
    update : async () => {

    },
    create : async (data) => {
        const isCreated = await db.Personnes.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async () => {

    },
}
module.exports = personneService 