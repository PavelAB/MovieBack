class awardPersonneDTO{
    constructor({ID_Personne, type_award, name_award, year_award, ID_Award_Personne}){
        this.ID_Personne = ID_Personne,
        this.type_award = type_award,
        this.name_award = name_award,
        this.year_award = year_award,
        this.ID_Award_Personne = ID_Award_Personne
    }
}
module.exports = awardPersonneDTO