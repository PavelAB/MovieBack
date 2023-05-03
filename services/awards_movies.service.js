const awardMovieDTO = require("../dto/awardMovieDTO")
const { Op } = require("sequelize");
const db = require("../models")



const awardMovieService = {
    getAll : async () => {
        const { rows, count } = await db.Awards_Movies.findAndCountAll({
            include: [ db.Movies ],
            distinct: true
        })
        const award_Movie = rows.map( award => new awardMovieDTO(award))
        return {
            award_Movie, count 
        }
    },
    getByParams: async (data) => {
        if(data.type_award){
            data.type_award = data.type_award.replace("_", " ") 
        }
        if(data.name_award){
            data.name_award = data.name_award.replace("_", " ") 
        }

        const Variable_Test = [data]
        
        
        console.log('Variable_Test ', Variable_Test);

        const { rows, count} = await db.Awards_Movies.findAndCountAll({
            include: [ db.Movies ],
            distinct: true,
            where: {
                [ Op.and ]: Variable_Test
            }
        })

        const values = rows.map(award => new awardMovieDTO(award))
        return { 
            values, count
        } 
    },
    update : async () => {
        //TODO update
    },
    create : async (data) => {
        // TODO ajouter la feature pour ajouter le film associe
        const isCreate = await db.Awards_Movies.create(data)
        if(isCreate)
            return true
        else
            return false
    },
    delete : async (id) => {
        //TODO Ajouter la varification si l'element a ete supprimer renvoyer true or false
        console.log(id);
        const isDeleted = await db.Awards_Movies.destroy({
            where:{
                ID_Award_Movie : id
            }
        })
    }  
}
module.exports = awardMovieService 