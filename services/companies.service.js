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
        const transaction = await db.sequelize.transaction()
        let isCreate
        try {

            isCreate = await db.Companies.create(data)
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