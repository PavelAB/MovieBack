class awardPersonneDTO{
    constructor({Personne, type_award, name_award, year_award, ID_Award_Personne}){
        if(Personne){
            this.Personne = {
                first_name: Personne.first_name,
                last_name: Personne.last_name
            }
        }
        else
            this.Personne = null
        this.type_award = type_award,
        this.name_award = name_award,
        this.year_award = year_award,
        this.ID_Award_Personne = ID_Award_Personne
    }
}
module.exports = awardPersonneDTO