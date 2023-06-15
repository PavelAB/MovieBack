class personneDTO{
    constructor({ ID_Personne, first_name, last_name, birth_date, job, Awards_Personnes, ActedMovies, WrittenMovies, isDirector}){
        this.ID_Personne = ID_Personne,
        this.first_name = first_name,
        this.last_name = last_name,
        this.birth_date = birth_date,
        this.job = job
        this.Awards_Personnes = Awards_Personnes
        this.ActedMovies = ActedMovies ? ActedMovies.map( item => item.title) : []
        this.WrittenMovies = WrittenMovies ? WrittenMovies.map ( item => item.title ) : []
        this.isDirector = isDirector ? isDirector.map ( item => item.title ) : []
    }
}
module.exports = personneDTO