class userDTO {
    constructor({ ID_User, first_name, last_name, birth_date, login, email, Ratings, Comments }) {
        this.ID_User = ID_User,
        this.first_name = first_name,
        this.last_name = last_name,
        this.birth_date = birth_date,
        this.login = login,
        this.email = email,
        //TODO ajouter les DTO pour n'est pas afficher l'objet complet
        this.Ratings = Ratings,
        this.Comments = Comments

    }
}
class UserDTOToken {
    constructor({ ID_User, role }, token) {
        this.ID_User = ID_User
        this.role = role
        this.token = token
    }
}
module.exports = { userDTO, UserDTOToken }