/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                  
 * Purpose      : define user schema for database , use mongoose methods to perform db operations 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : models/user.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : neccessary to define user schema for database ,define functions accessed by services layer  
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 8-07-2021
 **********************************************************************************************************/
 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt')


 const UserSchema = mongoose.Schema({
     firstName: {
         type: String,
         required: true,
         validate: /^[a-zA-Z]{3,15}$/
     },
     lastName: {
         type: String,
         required: true,
         validate: /^[a-zA-Z]{3,15}$/
     },
     email: {
         type: String,
         validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
         unique: true
     },
     password: {
         type: String,
         required: true,
     }
 }, {
     timestamps: true
 });

//encrypt password using hashing before saving in database
UserSchema.pre("save", function (next) {
    const user = this;

    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
        if (error) {
            return next(error);
        }
        user.password = hashedPassword;
        next();
    });
});
 
 const UserModel = mongoose.model('User', UserSchema);
 
 class UsersModule{
     /**
      * @description registerUser method is to save the new User Data in database
         * @param userdData is data sent from Services layer
         * @return callBack is used to callback Services includes error message or data
      */
         registerUser(userData,callBack){
             try {
                 const user = new UserModel({
                     firstName : userData.firstName,
                     lastName : userData.lastName,
                     email : userData.email,
                     password : userData.password
                 });
 
                 UserModel.findOne({email: user.email},(error,data)=>{
                     if(error){
                         return callBack(error,null)
                     }else if(data == null){
                         user.save({},(error,data)=>{
                             return (error) ? callBack(error,null) : callBack(null,data)
                             }
                         )
                     }else{
                         let error = "This email alresdy exists"
                         return callBack(error,null)
                     }
                 })
                
             } catch (error) {
                 return callBack(error,null)
        }
    }

    loginUser(loginDetails,callBack){
        try {
            UserModel.findOne({email: loginDetails.email},(error,data)=>{
                if(error){
                    return callBack(error,null)
                }
                return (!data) ? callBack('user not found',null) : callBack(null,data)
                }
            )
        } catch (error) {
            return callBack(error,null)
        }
    }
 
 }
 module.exports = new UsersModule()