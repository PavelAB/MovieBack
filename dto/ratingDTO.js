class ratingDTO{
    constructor({ ID_Rating, rate_picture, rate_actor_game, rate_cinematography, rate_sound, rate_writing, Movie, User }){
        this.ID_Rating = ID_Rating,
        this.rate_picture = rate_picture,
        this.rate_actor_game = rate_actor_game,
        this.rate_cinematography = rate_cinematography,
        this.rate_sound = rate_sound,
        this.rate_writing = rate_writing
        if(Movie){
            this.Movie = {
                title: Movie.title,
            }
        }
        else
            this.Movie = null
        if (User) {
            this.User = {
                login: User.login
            }
        }
        else
            this.User = null
    }
}
module.exports = ratingDTO