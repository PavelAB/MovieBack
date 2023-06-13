const {companyDTO} = require("../dto/companyDTO")
const db = require("../models")
const { Op } = require("sequelize");


const companyService = {
    getAll: async () => {
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

    update : async ( id, data ) => {

        const transaction = await db.sequelize.transaction()
        let updateCompany

        try {
            updateCompany = await db.Companies.update(data, {
                where: {
                    ID_Company : id
                },
                include: [db.Movies]
            },{transaction})

            const isCompanyToUpdate = await db.Companies.findByPk(id,{
                include:[db.Movies]
            },{transaction})

            await  isCompanyToUpdate.addMovie(data.movie,{transaction})
            await transaction.commit()
            
        } catch (error) {
            await transaction.rollback()
            return false
        }
        return true
    },

    removeMovieInCompany : async ( id, data ) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {
            
            const updateCompany = await db.Companies.findByPk(id,{
                include: [db.Movies]
            },{transaction})

            affectedRows = await updateCompany.removeMovie(data, {transaction})
            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }
        if(affectedRows === 0)
            return "NotInRange"
        else
            return true
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

        const isDeleted = await db.Companies.findByPk(id)

        await db.Companies.destroy({
            where:{
                ID_Company : id
            }
        })

        if (isDeleted)
            return true
        else
            return false
    },
}
module.exports = companyService 