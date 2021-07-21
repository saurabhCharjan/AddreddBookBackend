/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : services layer handles the actual business logic of our application
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : services/contact.js
 * @overview    : Performs tasks to interact with controller and model layer
 * @module      : calls functions from model layer which involves db operations & return response to controller  
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 14-07-2021
 **********************************************************************************************************/
 const contactModel = require('../models/contact')

 class contactService{
     /**
      * creates an contact object by calling model methods
      * @param {*} contact 
      * @param {*} callBack 
      * @returns callback
      */
     async createContact(contact){
         try {
             const createContact = await contactModel.createContact(contact) 
             return createContact;
         } catch (error) {
             return error;
         }
     }
     /**
      * retrives all the data from database 
      * @param {} callBack callback
      */
     getContacts(callBack){
        contactModel.getContacts((error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
     }
/**
 * retrives data by id
 * @param {*} contactId 
 * @param {*} callBack callback
 */
     getContactById(contactId,callBack){
        contactModel.getContactById(contactId,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
     }
/**
 * updating the contacts
 * @param {*} contactId id for objest 
 * @param {*} contactData data we want to update with
 * @param {*} callBack callback
 */
     updateContact(contactId,contactData,callBack){
        contactModel.updateContact(contactId,contactData,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }
/**
 * delete the perticular contact
 * @param {*} contactId id for object
 * @param {*} callBack callback
 */
    removeContact(contactId){
    return  contactModel.removeContact(contactId)
         .then(res=>{
            return res
        }).catch(error=>{
            return error
        })
    }
 }
 
 module.exports = new contactService()