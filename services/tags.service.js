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

    getByParams: async (data) => {

        const Variable_Test = [data]
        
        
        console.log('Variable_Test ', Variable_Test);

        const { rows, count} = await db.Tags.findAndCountAll({
            include: [ db.Movies ],
            distinct: true,
            where: {
                [ Op.and ]: Variable_Test
            }
        })

        const values = rows.map(item => new tagDTO(item))
        return { 
            values, count
        } 
    },

    update : async ( id, data ) => {

        const transaction = await db.sequelize.transaction()
        let updateTag

        try {
            console.log('id',id);
            console.log('body',data);
            updateTag = await db.Tags.update(data, {
                where: {
                    ID_Tag : id
                },
                include: [db.Movies]
            },{transaction})

            const isTagToUpdate = await db.Tags.findByPk(id,{
                include:[db.Movies]
            },{transaction})

            await  isTagToUpdate.addMovie(data.movie,{transaction})
            await transaction.commit()
            
        } catch (error) {
            await transaction.rollback()
            return false
        }
        return true
    },

    removeMovieInTag : async ( id, data ) => {

        let affectedRows
        const transaction = await db.sequelize.transaction()

        try {
            
            const updateTag = await db.Tags.findByPk(id,{
                include: [db.Movies]
            },{transaction})

            affectedRows = await updateTag.removeMovie(data, {transaction})
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

    delete : async (id) => {
        const isDeleted = await db.Tags.findByPk(id)

        await db.Tags.destroy({
            where: {
                ID_Tag: id
            }
        })

        if(isDeleted)
            return true
        else
            return false

    },
}
module.exports = tagService 