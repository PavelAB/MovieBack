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
        this.Actors = Actors
        this.Writers = Writers
        this.Director = Director

    }
}
module.exports = movieDTO