/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                  
 * Purpose      : define user schema for database , use mongoose methods to perform db operations 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : models/contact.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : neccessary to define user schema for database ,define functions accessed by services layer  
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 8-07-2021
 **********************************************************************************************************/
 const mongoose = require('mongoose');
 
 const contactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    address: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9-,/_: ]{3,50}$/
    },
    city: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    state: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,30}$/
    },
    zipCode: {
        type: Number,
        required: true,
        validate: /^[0-9]{6}$/
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: /^[6-9]{1}[0-9]{9}$/
    },
    email: {
        type: String,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    }
 }, {
     timestamps: true
 });
 
 const UserModel = mongoose.model('contact', contactSchema);
 
 class contactModel{
     /**
      * @description registerUser method is to save the new User Data in database
         * @param userdData is data sent from Services layer
         * @return callBack is used to callback Services includes error message or data
      */
         createContact(data,callBack){
             try {
                 const contact = new UserModel({
                    firstName:data.firstName,
                    lastName: data.lastName,
                    address:data.address,
                    city:data.city,
                    state:data.state,
                    zipCode:data.zipCode,
                    phoneNumber:data.phoneNumber,
                    email:data.email
                 });
                 contact.save({},(error,data)=>{
                 return (error) ? callBack(error,null) : callBack(null,data)
                 })             
             } catch (error) {
                 return callBack(error,null)
        }
    }
 
 }
 module.exports = new contactModel()