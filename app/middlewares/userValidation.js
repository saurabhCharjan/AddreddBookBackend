/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : user input request validation for registration
 *
 * @description  :joi package need to be installed & required before execution of this file 
 *
 * @file        : middlewares/userValidation.js
 * @overview    : validates the user data send as request to server 
 * @module      : validates input request against pre-defined object schema since users can send anything 
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 14-07-2021
 **********************************************************************************************************/
 const joi = require('joi');

 const userSchema = joi.object({
     firstName: joi.string().min(3).max(15).required(),
     lastName: joi.string().min(3).max(15).required(),
     email: joi.string().email().required(),
     password: joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$')).required()
 })
 
 module.exports = {userSchema}