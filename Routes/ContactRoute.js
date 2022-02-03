const { createContact, getAllContacts, getContactById, updateContactById, deleteContactById } = require('../Controllers/ContactController');
const contactRoute = require('express').Router();

contactRoute.post('/',createContact);
contactRoute.get('/', getAllContacts);
contactRoute.get('/:id',getContactById);
contactRoute.put('/:id', updateContactById);
contactRoute.get('/delete/:id', deleteContactById)

module.exports = contactRoute;