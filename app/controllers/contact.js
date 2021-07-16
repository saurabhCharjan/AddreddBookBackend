/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : controller handles request and responses for crud operations
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controller/contact.js
 * @overview    : Handles requests coming from clients for crud operation 
 * @module      : neccessary part (controller) of MVC Model of AddressBook
 *  API
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 13-07-2021
 **********************************************************************************************************/
const contactService = require('../service/contact')
const {contactSchema} = require('../middlewares/contactValidation')
class contact{
    createContact(req,res){
        try {
            const contact = {
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                address:req.body.address,
                city:req.body.city,
                state:req.body.state,
                zipCode:req.body.zipCode,
                phoneNumber:req.body.phoneNumber,
                email:req.body.email
            }

            const result = contactSchema.validate(contact)
            result.error ?
            res.status(422).send({success: false, message: result.error.details[0].message})
            :
            contactService.createContact(contact,(error,data)=>{
                error ?
                    res.status(500).send({
                        success: false, message: "Some error occurred while saving the contact"
                    })
                :
                    res.status(200).send({
                        success: true, message: "User created successfully!", token : data
                    });
            })
            
        } catch (error) {
            return res.send({message:error})
        }
    }

    getContacts(req,res){
        contactService.getContacts((error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving contacts"
                })
            :
                res.status(200).send({
                    success: true, message: "Contacts retrived successfully!", data: data
                });
            
        });
    }

    getContactById(req,res){
        let contactId = req.params;
        contactService.getContactById(contactId,(error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving contact"
                })
            :
                res.status(200).send({
                    success: true, message: "Contact retrived successfully!", data: data
                });
            
        });
    }

    updateContact(req,res){
        let contactId = req.params;
        const contactData = {
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                address:req.body.address,
                city:req.body.city,
                state:req.body.state,
                zipCode:req.body.zipCode,
                phoneNumber:req.body.phoneNumber,
                email:req.body.email
        }  
        contactService.updateContact(contactId,contactData,(error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while updating contact"
                })
            :
                res.status(200).send({
                    success: true, message: "Contacts updated successfully!", data: data
                })
            
        });
    }

    removeContact(req,res){
        let contactId = req.params;
        contactService.removeContact(contactId,(error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while removing contact"
                })
            :
                res.status(200).send({
                    success: true, message: "Contact removed successfully!", data: data
                });
            
        });
    }
}
module.exports = new contact()