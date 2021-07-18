/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 
 * Purpose      : User authentication and authorization 
 *
 * @description  :bcrypt,dotenv package need to be installed & required before execution of this file 
 *
 * @file        : middlewares/helper.js
 * @overview    : validate user entered password ,generate jwt token 
 * @module      : check entered user password with password saved in db,generate token 
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 9-07-2021
 ********************************************************************************************************/
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken');
 require('dotenv').config();
 
 class Helper{
    /**
     * 
     * @param {*} userPassword 
     * @param {*} passwordFromDB 
     * @returns boolean
     */
     checkPassword(userPassword,passwordFromDB){
         if(bcrypt.compareSync(userPassword,passwordFromDB)){
             return true
         }else{
             return false
         }
     }

     /**
  * Method For Token generation
  * @param {object} userData data from client/user
  * @returns token
  */ 
     generateToken(userData){
         try {
             return jwt.sign(userData, process.env.KEY);
         } catch (error) {
             
         }
     }

     /**
      * 
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      * @returns http status and object
      */
     authenticateToken(req,res,next){
        let token = req.get("token");
        if(token){
            jwt.verify(token,process.env.KEY,(error)=>{
                if(error){
                    return res.status(400).send({
                        success: false,
                        message: 'Token is not valid', 
                    })
                }else{
                    next();
                }
            })
        }else{
            return res.status(401).send({
                success: false,
                message: 'user not found'
            })
        }
    }
}
module.exports = new Helper(); 