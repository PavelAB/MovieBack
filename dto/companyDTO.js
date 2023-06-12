class companyDTO{
    constructor({ ID_Company, name_company, Movies }){
        this.ID_Company = ID_Company,
        this.name_company = name_company
        this.Movies = Movies ? Movies.map((item) => (new companyMovieDTO(item))) : []
    }
}
class companyMovieDTO{
    constructor({title}){
        this.title = title
    }
}

module.exports = { companyDTO, companyMovieDTO }


