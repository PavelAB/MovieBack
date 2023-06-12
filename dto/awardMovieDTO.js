class awardMovieDTO{
    constructor({Movie, type_award, name_award, year_award, ID_Award_Movie}){
        if(Movie){
            this.Movie = {
                title: Movie.title
            }
        }
        else
            this.Movie = null
        this.type_award = type_award,
        this.name_award = name_award,
        this.year_award = year_award,
        this.ID_Award_Movie = ID_Award_Movie


    }
}
module.exports = awardMovieDTO