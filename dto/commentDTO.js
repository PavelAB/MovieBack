class commentDTO{
    constructor({ ID_Comment, body, like_comment, dislike_comment, Movie, User}){
        this.ID_Comment = ID_Comment,
        this.body = body,
        this.like_comment = like_comment,
        this.dislike_comment = dislike_comment
        if(Movie){
            this.Movie = {
                ID_Movie: Movie.ID_Movie,
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
module.exports = commentDTO