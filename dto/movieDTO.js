
// TODO Completely redo the DTOs; I'm receiving incorrect data on the front end, and this is not acceptable
class movieDTO{
    constructor({ ID_Movie, title, cover, release_date, directed_by, 
                    Ratings, Comments, Genres, Tags, Companies, Awards_Movies, Actors, Writers, Director }){
        this.ID_Movie = ID_Movie,
        this.title = title,
        this.cover = cover,
        this.release_date = release_date,
        this.directed_by = directed_by
        this.Ratings = Ratings
        this.Comments = Comments
        this.Genres = Genres
        this.Tags = Tags
        this.Companies = Companies
        this.Awards_Movies = Awards_Movies
        this.Actors = Actors? Actors.map((item, index) => {
            return {
                ID_Personne : item.dataValues.ID_Personne,
                first_name : item.dataValues.first_name,
                last_name : item.dataValues.last_name,
                job: item.dataValues.job,
                birth_date: item.dataValues.birth_date,
            }
        }) : []
        this.Writers = Writers
        this.Director = Director

    }
}

class MoviesData {
    constructor({values, totalCount, totalPages, currentPage}){
        this.values = values
        this.totalCount = totalCount
        this.totalPages = totalPages
        this.currentPage = currentPage
    }
}


module.exports = {movieDTO, MoviesData}