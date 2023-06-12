class ErrorResponse{
    constructor(msg, code = 400){
        this.msg = msg 
        this.statusCode = code
    }
}
module.exports = {ErrorResponse}