const genreDTO = require("../dto/genreDTO")
const db = require("../models")
const { Op } = require("sequelize");


const genreService = {
    getAll: async () => {
        const { rows, count } = await db.Genres.findAndCountAll({
            include: [ db.Movies ],
            distinct: true
        })
        const values = rows.map(genre => new genreDTO(genre))
        return {
            values, count
        }
    },
    getByParams: async (data) => {

        const Variable_Test = [data]
        
        
        console.log('Variable_Test ', Variable_Test);

        const { rows, count} = await db.Genres.findAndCountAll({
            include: [ db.Movies ],
            distinct: true,
            where: {
                [ Op.and ]: Variable_Test
            }
        })

        const values = rows.map(genre => new genreDTO(genre))
        return { 
            values, count
        } 
    },
    update: async () => {
        //TODO update
    },
    create: async (data) => {
        //TODO Modifier le create
        const isCreated = await db.Genres.create(data)
        if(isCreated)
            return true
        else
            return false
    },
    delete: async (id) => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false
        const isDeleted = await db.Genres.destroy({
            where:{
                ID_Genre : id
            }
        })
    },
}
module.exports = genreService 