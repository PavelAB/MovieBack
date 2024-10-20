
class commentDTO {
    constructor({ ID_Comment, body, Comment, User, Movie, createdAt }) {
        this.ID_Comment = ID_Comment,
        this.body = body,
        this.User = User,        
        this.Movie = Movie
        /* TODO Change this !!! Currently, I’m not sure how to add the information 
        about whether the connected user has already liked the comment. 
        So, I’ve simply retrieved the list of users who have liked the comment, 
        and I’ll check on the front end if the connected user is in this list.
        */
        this.IDUsersLiked = Comment ? Comment.map((Comment, index) => {
            console.log("test :>", Comment.MM_Users_Comments.dataValues)
            if(Comment.MM_Users_Comments.dataValues.Like)
                return Comment.MM_Users_Comments.dataValues.ID_User
            return null
        }).filter(id => id !== null) : []
        this.NumberLikes = this.IDUsersLikes.length,
        this.createdAt = createdAt
    }
}
module.exports = commentDTO