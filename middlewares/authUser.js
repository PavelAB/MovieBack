const {Request,Response,NextFunction}= require('express');
const jwt = require('../utils/jwt.utils');


const authUserId = ()=>{
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req,res,next)=>{
        const bearerToken = req.headers.authorization
        //console.log(bearerToken);
        const token = bearerToken? bearerToken?.split(" ")[1] : null
        //console.log(token);
        
        const payload = await jwt.decode(token)
        console.log(payload.id);
        const id = req.params.ID_User //id dans le params est une chaine de caracteres, id dans le payload est un number ==> egalite strict ne fonction pas!
        console.log("ID",id);
        if(payload.role !=="Admin" && id!=payload.id)
            {
                res.status(401).json("Acces Interdit")
                return
            }
        


        next()
    }
}
module.exports = authUserId