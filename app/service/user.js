/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : services layer handles the actual business logic of our application
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : services/user.js
 * @overview    : Performs tasks to interact with controller and model layer
 * @module      : calls functions from model layer which involves db operations & return response to controller  
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 13-07-2021
 **********************************************************************************************************/
 const userModel = require('../models/user')
 const helper = require('../middlewares/helper')
 class userService{
     registerUser(userData,callBack){
         try {
             userModel.registerUser(userData,(error,data)=>{
                 return (error) ? callBack(error,null) : callBack(null,data)
             })
         } catch (error) {
             return callBack(error,null)
         }
     }

     loginUser(loginDetails,callBack){
        try {
            userModel.loginUser(loginDetails,(error,data)=>{
                if(error)return callBack(error,null)
                if(helper.checkPassword(loginDetails.password,data.password)){
                    const token = helper.generateToken(loginDetails)
                    if(token){
                        return callBack(null,token)
                    }
                    return callBack(error,null)
                }else{
                    return callBack(error,null)
                }
                
            })
        } catch (error) {
            return callBack(error,null)
        }
    }

 }
 
 module.exports = new userService()