class personneDTO{
    constructor({ ID_Personne, first_name, last_name, birth_date, job, Awards_Personnes }){
        this.ID_Personne = ID_Personne,
        this.first_name = first_name,
        this.last_name = last_name,
        this.birth_date = birth_date,
        this.job = job
        this.Awards_Personnes = Awards_Personnes
    }
}
module.exports = personneDTO