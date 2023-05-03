class commentDTO{
    constructor({ ID_Comment, body, like_comment, dislike_comment, ID_Movie, ID_User}){
        this.ID_Comment = ID_Comment,
        this.body = body,
        this.like_comment = like_comment,
        this.dislike_comment = dislike_comment,
        this.ID_Movie = ID_Movie,
        this.ID_User = ID_User
    }
}
module.exports = commentDTO