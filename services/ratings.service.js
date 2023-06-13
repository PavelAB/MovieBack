const ratingDTO = require("../dto/ratingDTO")
const db = require("../models")
const { Op } = require("sequelize");


const ratingService = {
    getAll : async () => {
        const { rows, count } = await db.Ratings.findAndCountAll({
            include: [ 
                { model: db.Movies, as: 'Movie' },
                { model: db.Users, as: 'User' }
             ],
            distinct: true
        })
        const values = rows.map( rate => new ratingDTO(rate) )
        return {
            values, count 
        }
    },

    getByParams: async (data) => {

        //FIXME Maybe there is a way to do this using a map function.
        if (data.rate_picture)
            data.rate_picture = data.rate_picture.split(',')
        if (data.rate_actor_game)
            data.rate_actor_game = data.rate_actor_game.split(',')
        if (data.rate_cinematography)
            data.rate_cinematography = data.rate_cinematography.split(',')
        if (data.rate_sound)
            data.rate_sound = data.rate_sound.split(',')
        if (data.rate_writing)
            data.rate_writing = data.rate_writing.split(',')
        
            const Variable_Test = [data]
        
        
        console.log('Variable_Test ', Variable_Test);

        const { rows, count} = await db.Ratings.findAndCountAll({
            include: [ 
                { model: db.Movies, as: 'Movie' },
                { model: db.Users, as: 'User' }
            ],
            distinct: true,
            where: {
                [ Op.and ]: Variable_Test
            }
        })

        const values = rows.map( rate => new ratingDTO(rate) )
        return {
            values, count 
        }
    },

    update : async ( id, data ) => {

        const transaction = await db.sequelize.transaction()
        let updateRate

        try {
            updateRate = await db.Ratings.update(data, {
                where: {
                    ID_Rating : id
                }
            },{transaction})

            await transaction.commit()
            
        } catch (error) {
            await transaction.rollback()
            return false
        }
        return true
    },

    create : async (data) => {
        const transaction = await db.sequelize.transaction()
        let isCreated
        try {
            isCreated = await db.Ratings.create(data, {transaction})
            const movie = await db.Movies.findByPk(data.ID_Movie, { transaction })
            await isCreated.setMovie(movie, { transaction })
            const user = await db.Users.findByPk(data.ID_User, {transaction})
            await isCreated.setUser(user, {transaction})
            await transaction.commit()

        } catch (error) {
            console.log(error);
            await transaction.rollback()
            return false
        }

        if(isCreated)
            return true
    },
    delete : async (id) => {
        const isDeleted = await db.Ratings.findByPk(id)

        await db.Ratings.destroy({
            where: {
                ID_Rating: id
            }
        })

        if (isDeleted)
            return true
        else
            return false

    },
}
module.exports = ratingService 