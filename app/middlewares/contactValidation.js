/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : user input request validation for contacts
 *
 * @description  :joi package need to be installed & required before execution of this file 
 *
 * @file        : middlewares/contactValidation.js
 * @overview    : validates the contacts send from user
 * @module      : validates input request against pre-defined object schema since users can send anything 
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 14-07-2021
 **********************************************************************************************************/
 const joi = require('joi');

 const contactSchema = joi.object({
     firstName: joi.string().min(3).max(15).required(),
     lastName: joi.string().min(3).max(15).required(),
     address:joi.string().max(3).max(30).required(),
     city:joi.string().max(3).max(20).required(),
     state:joi.string().max(3).max(20).required(),
     zipCode:joi.string().max(6).max(6).required(),
     phoneNumber:joi.string().max(10).max(12).required(),
     email: joi.string().email().required()
     
 })
 
 module.exports = {contactSchema}