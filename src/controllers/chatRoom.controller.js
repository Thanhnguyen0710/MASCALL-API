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
    const chatRooms = await ChatRoom.find({email: new RegExp(query), lastMessage: {"$ne": null}}).sort({updatedDate: -1});
    chatRooms.forEach(async data => {
      if (data.email.length === 2) {
        const emailFriend = data.email.filter(email => email !== query)[0];
        const userFriend = await User.findOne({email: emailFriend});
        if (userFriend) {
          data.name = userFriend.displayName;
          data.photoURL = userFriend.photoURL;
        }
      }
    })
    res.send(chatRooms)
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
