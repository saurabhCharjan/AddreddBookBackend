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
const helper = require('../middlewares/helper')
const contact = require('../controllers/contact')
const user = require('../controllers/user')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger/swagger.json');

 module.exports = (app) => {
    
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument));
    
    //Create a new User
    app.post('/registerUser', user.registerUser);

    //User Login
    app.post('/login',user.loginUser);

    //add new contact in addressbook
    app.post('/addressbook/addcontact', helper.authenticateToken, contact.createContact);

    //get all contacts in addressbook
    app.get('/addressbook/getcontact', helper.authenticateToken, contact.getContacts);

    //get one contact by id
    app.get('/addressbook/getcontact/:contactId', helper.authenticateToken, contact.getContactById);

    //update contact details in addressbook
    app.put('/addressbook/updatecontact/:contactId', helper.authenticateToken, contact.updateContact);

    //delete contact by id
    app.delete('/addressbook/deletecontact/:contactId', helper.authenticateToken, contact.removeContact);

    }