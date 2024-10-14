class commentDTO {
    constructor({ ID_Comment, body, Movie, ID_User, ID_Movie, Comment }) {
        this.ID_Comment = ID_Comment,
        this.body = body,
        this.ID_User = ID_User,
        this.Comment = Comment ? Comment.map((comment, index) => {
            return comment.MM_Users_Comments.dataValues
        }) : null
        this.ID_Movie = ID_Movie

    }
}
module.exports = commentDTO