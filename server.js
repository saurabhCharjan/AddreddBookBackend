/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                
 * Purpose      : entry point for the program where express app is created
 *
 * @description  :Dependencies require to be installed before execution of this file 
 *
 * @file        : server.js
 * @overview    : Create web application using express,Set up the server,connect to database,define routes
 * @module      : starting point to run the AddressBook Api
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 13-07-2021
 **********************************************************************************************************/

 const express = require('express');
 const dbConfig = require('./config/config.js');
 
 // create express app
 const app = express();
 
 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({ extended: true }))
 
 //connecting to database
 dbConfig();
 
 // parse requests of content-type - application/json
 app.use(express.json())
 
 // define a simple route
 app.get('/', (req, res) => {
     res.json({"message": "Welcome to AddressBook application."});
 });
 
 //Require AddressBook routes
 require('./app/routes/routes')(app);
 
 // listen for requests
 app.listen(3000, () => {
     console.log("Server is listening on port 3000 ");
 });
 