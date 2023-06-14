class tagDTO{
    constructor({ ID_Tag, name_tag, Movies }){
        this.ID_Tag = ID_Tag,
        this.name_tag = name_tag
        this.Movies = Movies ? Movies.map((item) => (new TagsMovieDTO(item))) : []
        //this.Movies = Movies
    }
    
}

class TagsMovieDTO{
    constructor({title}){
        this.title = title
    }
}

module.exports = tagDTO