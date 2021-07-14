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
 
     checkPassword(userPassword,passwordFromDB){
         if(bcrypt.compareSync(userPassword,passwordFromDB)){
             return true
         }else{
             return false
         }
     }
 
     generateToken(userData){
         try {
             return jwt.sign(userData, process.env.KEY);
         } catch (error) {
             
         }
     }
}
module.exports = new Helper(); 