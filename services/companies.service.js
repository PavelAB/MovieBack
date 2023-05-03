const companyDTO = require("../dto/companyDTO")
const db = require("../models")
const { Op } = require("sequelize");



const companyService = {
    getAll : async () => {
        const { rows, count } = await db.Companies.findAndCountAll({
            include: [ db.Movies ],
            distinct: true
        })
        const values = rows.map( company => new companyDTO(company) )
        return {
            values, count 
        }
    },
    getByParams: async (data) => {

        const Variable_Test = [data]
        
        
        console.log('Variable_Test ', Variable_Test);

        const { rows, count} = await db.Companies.findAndCountAll({
            include: [ db.Movies ],
            distinct: true,
            where: {
                [ Op.and ]: Variable_Test
            }
        })

        const values = rows.map(company => new companyDTO(company))
        return { 
            values, count
        } 
    },
    update : async () => {
        //TODO Update
    },
    create : async (data) => {
        //TODO Modifier le create
        const isCreated = await db.Companies.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete : async (id) => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false
        const isDeleted = await db.Companies.destroy({
            where:{
                ID_Company : id
            }
        })
    },
}
module.exports = companyService 