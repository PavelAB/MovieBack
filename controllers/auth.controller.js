const { Request, Response } = require('express')
const jwt = require('../utils/jwt.utils')
const authService = require('../services/auth.service')
const { UserDTOToken } = require('../dto/userDTO')
const { ErrorResponse } = require('./../utils/ErrorResponse')


const authController = {
    /**
     * register
     * @param {Request} req 
     * @param {Response} res 
     */
    
    register: async( req,res ) => {
        const data = req.body
        const newUser = await authService.register(data)
        
        if(newUser)
            res.status(200).json(newUser)
        else
            res.status(400).json( new ErrorResponse('Something went wrong. Please try again.') ) 
    },



    /**
     * login
     * @param {Request} req 
     * @param {Response} res 
     */
    login: async( req,res ) => {
        console.log("req", req.body);
        const { login, password } = req.body
        const isLogin = await authService.login( login, password )

        if(!isLogin){
            res.status(401).json(new ErrorResponse("The login or password is incorrect.", 401))
            return
        }
        const token = await jwt.generate(isLogin)

        const newUser = new UserDTOToken( isLogin, token )
        //FIXME NOT_IMPORTANT Perhaps change the way the 'SuccessResponse' is returned.
        if(token)
            res.status(200).json(newUser)
        else    
            res.status(400).json(new ErrorResponse("Something went wrong, the token was not generated. Please try again.", 400))
        
         
    }

}
module.exports = authController