const ChatRoom = require('../models/ChatRoom');

module.exports.addNewMessage = async (room_id, message) => {
  try {
    const chatRoom = await ChatRoom.findOneAndUpdate({_id: room_id}, {"$push": {messages: message}}, {new: true});
    return chatRoom.messages[chatRoom.messages.length - 1]
  } catch (err) {
    console.log(err)
  }
}

module.exports.deleteMessage = async (room_id, message) => {
  try {
    await ChatRoom.updateOne({_id: room_id}, {"$pull": {messages: message}});
    return message
  } catch (err) {
    console.log(err)
  }
}