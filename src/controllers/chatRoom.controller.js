const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

module.exports.addRoom = async (req, res) => {
  const chatRoom = req.body;
  try {
    const newChatRoom = new ChatRoom(chatRoom);
    await newChatRoom.save();
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: newChatRoom
    })
  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.getRoom = async (req, res) => {
  const query = req.query.email;
  try {
    const chatRooms = await ChatRoom.find({email: new RegExp(query), messages: {"$ne": null}}).sort({updatedDate: -1});
    for (let i = 0 ; i < chatRooms.length ; i++) {
      if (chatRooms[i].email.length === 2) {
        const emailFriend = chatRooms[i].email.filter(email => email !== query)[0];
        const userFriend = await User.findOne({email: emailFriend});
        if (userFriend) {
          chatRooms[i].name = userFriend.displayName;
          chatRooms[i].photoURL = userFriend.photoURL;
        }
      }
    }
    
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: chatRooms
    })
  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.updateRoom = async (req, res) => {
  try {

  } catch (error) {
    res.status(401).send("Bad request");
  }
}

module.exports.deleteRoom = async (req, res) => {
  const idRoom = req.params.id;
  try {
    await ChatRoom.deleteOne({_id: idRoom});
    res.status(200).send({
      errorCode: '0',
      errorMessages: 'Success',
      data: null
    })
  } catch (error) {
    res.status(401).send("Bad request");
  }
}
