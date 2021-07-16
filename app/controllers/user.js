/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : controller handles request and responses of  user login & registartion
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controller/users.js
 * @overview    : Handles requests coming from clients to login & register 
 * @module      : neccessary part (controller) of MVC Model of AddressBook
 *  API
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 13-07-2021
 **********************************************************************************************************/

 const userService = require('../service/user')
 const {userSchema} = require('../middlewares/userValidation')
 class User {
 
    registerUser(req,res){
        try {
            const userData = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : req.body.password
            }

            const result = userSchema.validate(userData)
        if(result.error){
            res.status(422).send({
                success: false, message: result.error.details[0].message
            })
        }
        else{
            userService.registerUser(userData,(error,data)=>{
                error ?
                    res.status(500).send({
                        success: false, message: "Some error occurred while registering user"
                    })
                :
                    res.status(200).send({
                        success: true, message: "User created successfully!", data : data
                    });
                }
            )
        }
    } catch (error) {
        return res.send({message:error})
    } 
}

     loginUser(req,res){
        try {
            const loginDetails = {
                email: req.body.email,
                password: req.body.password
            }    
            userService.loginUser(loginDetails,(error,data)=>{
                error ? 
                    res.status(404).send({
                        success: false, message: "Please enter correct user credentials"
                    })
                :
                    res.status(200).send({
                        success: true, message: "contact saved successfully!", token : data
                    });
                }
                )
        } catch (error) {
            return res.send({message:error})
        }
    }
}
 
 module.exports = new User()