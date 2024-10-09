class commentDTO {
    constructor({ ID_Comment, body, Movie, ID_User, ID_Movie }) {
        this.ID_Comment = ID_Comment,
        this.body = body,
        this.ID_User = ID_User,
        this.ID_Movie = ID_Movie

    }
}
module.exports = commentDTO