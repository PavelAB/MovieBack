class ratingDTO{
    constructor({ ID_Rating, rate_picture, rate_actor_game, rate_cinematography, rate_sound, rate_writing }){
        this.ID_Rating = ID_Rating,
        this.rate_picture = rate_picture,
        this.rate_actor_game = rate_actor_game,
        this.rate_cinematography = rate_cinematography,
        this.rate_sound = rate_sound,
        this.rate_writing = rate_writing
    }
}
module.exports = ratingDTO