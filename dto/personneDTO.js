class personneDTO{
    constructor({ ID_Personne, first_name, last_name, birth_date, job }){
        this.ID_Personne = ID_Personne,
        this.first_name = first_name,
        this.last_name = last_name,
        this.birth_date = birth_date,
        this.job = job
    }
}
module.exports = personneDTO