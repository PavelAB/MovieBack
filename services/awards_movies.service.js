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
    getByID : async () => {
        
    },
    getByParams: async (data) => {
        console.log(data);
        if(data.type_award){
            data.type_award = data.type_award.replace("_"," ") 
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
        // TODO ajouter create avec le film associer
        const isCreate = await db.Awards_Movies.create(data)
        if(isCreate)
            return true
        else
            return false
    },
    delete : async (id) => {
        console.log(id);
        const isDeleted = await db.Awards_Movies.destroy({
            where:{
                ID_Award_Movie : id
            }
        })
    }  
}
module.exports = awardMovieService 