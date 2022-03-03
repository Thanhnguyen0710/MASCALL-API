const Contact = require('../models/Contact');
const User = require('../models/User');

module.exports.addContact = async (req, res) => {
  const contact = req.body;
  try {
    if (contact.email === contact.emailMe) {
      res.status(201).send({
        errorCode: '2',
        errorMessages: 'Email no vailid',
        data: null
      })
      return;
    }
    const contactFriend = await Contact.findOne(contact);
    if (contactFriend) {
      res.status(201).send({
        errorCode: '3',
        errorMessages: 'Contact already exists',
        data: null
      })
      return;
    }
    const userFriend = await User.findOne({email: contact.email});
    let newContact = null;
    if (userFriend) {
      console.log(userFriend.email);
      newContact = new Contact({
        email: userFriend.email, 
        photoURL: userFriend.photoURL, 
        displayName: userFriend.displayName, 
        emailMe: contact.emailMe
      });
      await newContact.save();
      res.status(201).send({
        errorCode: '4',
        errorMessages: 'User already exists',
        data: null
      })
    } else {
      newContact = new Contact(contact);
      await newContact.save();
      res.status(201).send({
        errorCode: '0',
        errorMessages: 'Success',
        data: newContact
      })
    }
  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.getContact = async (req, res) => {
  const query = req.query.email;
  try {
    if (query) {
      const data = await Contact.find({emailMe: query});
      res.status(200).send({
        errorCode: '0',
        errorMessages: 'Success',
        data: data
      })
    } else {
      res.status(201).send({
        errorCode: '1',
        errorMessages: 'No query',
        data: null
      })
    }
  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.updateContact = async (req, res) => {
  const contact = req.body;
  try {
    await Contact.updateOne({_id: contact._id}, contact);
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: contact
    })
  } catch (error) {
    res.status(401).send("Bad request");
  }
}