class commentDTO {
    constructor({ ID_Comment, body, Movie, Comment }) {
        this.ID_Comment = ID_Comment,
        this.body = body,
        this.User = Comment[0].login
        if (Movie) {
            this.Movie = {
                ID_Movie: Movie.ID_Movie,
                title: Movie.title,
            }
        }
        else
            this.Movie = null
        // if (Comment && Comment.length > 0) {
        //     this.User = {
        //         login: Comment[0].login // ici vous pourriez avoir plusieurs utilisateurs, je prends le premier pour cet exemple
        //     }
        // }
        // else
        //     this.User = null

    }
}
module.exports = commentDTO