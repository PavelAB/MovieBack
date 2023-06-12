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

module.exports = {SuccessResponse, SuccesResponseMsg}