const awardMovieDTO = require("../dto/awardMovieDTO")
const db = require("../models")
const { Op } = require("sequelize");
const Movies = require("../models")



const awardMovieService = {

    getAll : async () => {
        const { rows, count } = await db.Awards_Movies.findAndCountAll({
            include: [ 
                { model: db.Movies, as: 'Movie' },
            ],
            distinct: true
        })
        const award_Movie = rows.map( award => new awardMovieDTO(award))
        return {
            award_Movie, count 
        }
    },

    getByParams: async (data) => {
        if(data.year_award)
            data.year_award = data.year_award.split(',')
        if(data.type_award){
            data.type_award = data.type_award.split(',')
            if(Array.isArray(data.type_award)){
                data.type_award.map((item) => {
                    item.replace("_", " ")
                })
    	    }
            else
                data.type_award = data.type_award.replace("_", " ")
        }
        if(data.name_award){
            data.type_award = data.type_award.split(',')
            if(Array.isArray(data.name_award)){
                data.name_award.map((item) => {
                    item.replace("_", " ")
                })
    	    }
            else
                data.name_award = data.name_award.replace("_", " ")
        }

        const Variable_Test = [data]
        
        
        console.log('Variable_Test ', Variable_Test);

        const { rows, count} = await db.Awards_Movies.findAndCountAll({
            include: [ 
                { model: db.Movies, as: 'Movie' },
            ],
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

    update : async ( id, data ) => {

        const updateAwardMovie = await db.Awards_Movies.update(data, {
            where : {
                ID_Award_Movie : id
            }
        })

        if( updateAwardMovie[0]=== 1 )
            return true
        else
            return false

    },

    create : async (data) => {
        console.log(data);
        const transaction = await db.sequelize.transaction()
        let isCreate
        try {

            isCreate = await db.Awards_Movies.create(data)
            const movie = await db.Movies.findByPk(data.ID_Movie, {transaction})
            if(movie)
                await movie.addAwards_Movies( data.award_movie, {transaction})

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
        const isDeleted = await db.Awards_Movies.findByPk(id)

        console.log(id);
        await db.Awards_Movies.destroy({
            where:{
                ID_Award_Movie : id
            }
        })
        if(isDeleted)
            return true
        else
            return false
    }  
}
module.exports = awardMovieService 