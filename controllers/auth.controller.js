const { Request, Response } = require('express')
const jwt = require('../utils/jwt.utils')
const authService = require('../services/auth.service')
const { UserDTOToken } = require('../dto/userDTO')


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
            res.sendStatus(400) 
    },
    /**
     * login
     * @param {Request} req 
     * @param {Response} res 
     */
    login: async( req,res ) => {
        const { login, password } = req.body
        console.log(req.body);
        const isLogin = await authService.login( login, password )

        if(!isLogin){
            res.sendStatus(401)
            return
        }
        const token = await jwt.generate(isLogin)

        const newUser = new UserDTOToken( isLogin, token )

        console.log(newUser);
        if(token)
            res.status(200).json(newUser)
        else    
            res.sendStatus(400)
        
         
    }

}
module.exports = authController