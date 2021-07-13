/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   
 * Purpose      : define end points for our application 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : routes/routes.js
 * @overview    : defines routes for login and registration
 * @module      :  use HTTP methods to send request to server 
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 13-07-2021
 **********************************************************************************************************/

 module.exports = (app) => {
    const user = require('../controllers/user')
    
    //Create a new User
    app.post('/registerUser', user.registerUser);

    //User Login
    //app.post('/login',user.loginUser);
}