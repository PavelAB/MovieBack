const awardMovieDTO = require("../dto/awardMovieDTO")
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
    update : async () => {

    },
    create : async () => {

    },
    delete : async () => {

    },
}
module.exports = awardMovieService 