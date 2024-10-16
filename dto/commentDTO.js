
class commentDTO {
    constructor({ ID_Comment, body, Comment, User, Movie }) {
        this.ID_Comment = ID_Comment,
        this.body = body,
        this.User = User,
        this.Comment = Comment ? Comment.map((comment, index) => {
            return comment.MM_Users_Comments.dataValues
        }) : null
        this.ID_Movie = Movie

    }
}
module.exports = commentDTO