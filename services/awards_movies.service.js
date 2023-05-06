const awardMovieDTO = require("../dto/awardMovieDTO")
const db = require("../models")
const Movies = require("../models")



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
        // FIXME ajouter la feature pour ajouter le film associe
        console.log(data);
        const transaction = await db.sequelize.transaction()
        let isCreate
        try {

            isCreate = await db.Awards_Movies.create(data)
            console.log(isCreate);
            await isCreate.addMovies(data.ID_Movie, {transaction})

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
        console.log(id);
        const isDeleted = await db.Awards_Movies.destroy({
            where:{
                ID_Award_Movie : id
            }
        })
    }  
}
module.exports = awardMovieService 