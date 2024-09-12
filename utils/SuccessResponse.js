class SuccessResponse{
    constructor(values, count){
        this.values = values,
        this.count = count
    }
}

class SuccesResponseMsg{
    constructor( msg, code = 200 ){
        this.msg = msg
        this.code = code
    }
}

class NewSuccessResponse{
    constructor({data, totalCount, totalPages, currentPage}){
        this.data = data
        this.totalCount = totalCount
        this.totalPages = totalPages
        this.currentPage = currentPage
    }
}

module.exports = {SuccessResponse, SuccesResponseMsg, NewSuccessResponse}