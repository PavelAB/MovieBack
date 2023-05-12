const { Request, Response } = require('express')
const jwt = require('../utils/jwt.utils')

const authRoles = (role) => {
    /**
    * 
    * @param {Request} req
    * @param {Response} res 
    * @returns
    */
   return async( req, res, next ) => {
    const bearerToken = req.headers.authorization
    //console.log(`bearerToken --------->>> ${bearerToken}`);
    const token = bearerToken ? bearerToken?.split(' ')[1] : null


    if( !token || token === ' ' || token === null || token === undefined){
        res.status(401).json('Pas de token')
        return
    } 
    const payload = await jwt.decode(token)
    console.log(payload); 

    if( role !== payload.role && payload.role !== 'Admin' ){
        res.status(401).json('Acces interdit')
        return
    }

    next()
    
   } 
}
module.exports = authRoles