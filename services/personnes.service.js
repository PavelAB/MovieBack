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
        //TODO faire l'update
    },
    create : async (data) => {
        //TODO Modifier le create
        const isCreated = await db.Personnes.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async () => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false

    },
}
module.exports = personneService 