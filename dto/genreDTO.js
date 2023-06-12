class genreDTO{
    constructor({ ID_Genre, name_genre, Movies }){
        this.ID_Genre = ID_Genre,
        this.name_genre = name_genre
        this.Movies = Movies ? Movies.map((item) => (new genreMovieDTO(item))) : []

    }
}
class genreMovieDTO{
    constructor({title}){
        this.title = title
    }
}

module.exports = { genreDTO, genreMovieDTO}