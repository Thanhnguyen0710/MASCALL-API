const ChatRoom = require('../models/ChatRoom');

module.exports.addNewMessage = async (room_id, message) => {
  try {
    const chatRoom = await ChatRoom.findOneAndUpdate({_id: room_id}, {"$push": {messages: message}}, {new: true});
    return chatRoom.messages[chatRoom.messages.length - 1]
  } catch (err) {
    console.lof(err)
  }
}

// module.exports.getRoom = async ()