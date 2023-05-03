class movieDTO{
    constructor({ ID_Movie, title, cover, release_date, directed_by }){
        this.ID_Movie = ID_Movie,
        this.title = title,
        this.cover = cover,
        this.release_date = release_date,
        this.directed_by = directed_by

    }
}
module.exports = movieDTO