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
    update : async () => {
        //TODO faire l'update
    },
    create : async (data) => {
        const transaction = await db.sequelize.transaction()
        let isCreated
        try {
            isCreated = await db.Ratings.create(data)

            const movie = await db.Movies.findByPk(data.Movies, { transaction })
            await isCreated.setMovie(movie, { transaction })

            const user = await db.Users.findByPk(data.Users, {transaction})
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