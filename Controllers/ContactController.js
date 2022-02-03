const Contact = require("../Models/ContactModel");

exports.createContact = (req, res) => {
    let { name, phone, email, id } = req.body;
    let contact = new Contact({
        name, phone, email,
    })

    let error = {};
    if (!name) {
        error.name = "Name is required!"
    }
    if (!phone) {
        error.phone = "Phone is required!"
    }
    if (!email) {
        error.email = "Email is required!"
    }
    let isError = Object.keys(error).length > 0;
    if (isError) {
        Contact.find()
            .then(contacts => {
                res.render("pages/index", { contacts, error });
                // swal("Hello world!");
            })
            .catch(err => {
                console.log(err);
                res.json({
                    "message": `Error occurred!`
                })
            })
    } else {
        if (id) {
            Contact.findOneAndUpdate({ "_id": id }, {
                $set: {
                    name, phone, email
                }
            }, { new: true }
            )
                .then(() => {
                    Contact.find()
                        .then(contacts => {
                            res.render("pages/index", { contacts, error: {} });
                        })
                        .catch(error => {
                            res.json({
                                "message": `Error occurred!`
                            })
                        })
                })
                .catch(error => {
                    console.log(error);
                    res.json({
                        "message": `Error occurred!`
                    })
                })
        }
        else {
            contact.save()
                .then(() => {
                    Contact.find()
                        .then(contacts => {
                            res.render("pages/index", { contacts, error: {} });
                        }).catch(err => {
                            res.json({
                                "message": `Error occurred!`
                            })
                        })
                })
                .catch(error => {
                    console.log(error);
                    res.json({
                        "message": `Error occurred!`
                    })
                })
        }
    }
}








exports.getAllContacts = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.render("pages/index", { contacts, error: {} });
        })
        .catch(error => {
            console.log(error);
            res.json({
                "message": `Error occurred!`
            })
        })
}

exports.getContactById = (req, res) => {
    let id = req.params.id;
    Contact.findOne({ "_id": id })
        .then(contact => {
            res.render("pages/singleContact", { contact });
        })
        .catch(error => {
            console.log(error);
            res.json({
                "message": `Error occurred!`
            })
        })
}

exports.updateContactById = (req, res) => {
    let { name, phone, email } = req.body;
    let getId = req.params.id;
    Contact.findOneAndUpdate({ "_id": getId }, {
        $set: {
            name, phone, email
        }
    }, { new: true }
    )
        .then(contact => {
            res.json(contact);
        })
        .catch(error => {
            console.log(error);
            res.json({
                "message": `Error occurred!`
            })
        })
}

exports.deleteContactById = (req, res) => {
    let { id } = req.params;
    Contact.findOneAndDelete({ "_id": id })
        .then(() => {
            Contact.find()
                .then(contacts => {
                    res.render("pages/index", { contacts, error: {} });
                }).catch(err => {
                    res.json({
                        "message": `Error occurred!`
                    })
                })
        })
        .catch(error => {
            console.log(error);
            res.json({
                "message": `Error occurred!`
            })
        })
}