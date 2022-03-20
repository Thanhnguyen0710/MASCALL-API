const ChatRoom = require('../models/ChatRoom');

module.exports.addNewMessage = async (room_id, message) => {
  try {
    const chatRoom = await ChatRoom.findOneAndUpdate({_id: room_id}, {"$push": {messages: message}}, {new: true});
    await ChatRoom.updateOne({"_id": room_id}, {"$inc": {"unSeens.$[elem].countMess": 1}}, { "arrayFilters": [{ "elem.email": { "$ne": message.email } }], "multi": true });
    return chatRoom.messages[chatRoom.messages.length - 1]
  } catch (err) {
    console.log(err)
  }
}

module.exports.deleteMessage = async (room_id, message) => {
  try {
    await ChatRoom.updateOne({_id: room_id}, {"$pull": {messages: {_id: message._id}}});
    return message
  } catch (err) {
    console.log(err)
  }
}

module.exports.deleUnSeen = async (room_id, email) => {
  try {
    await ChatRoom.updateOne({"_id": room_id}, {"$set": {"unSeens.$[elem].countMess": 0}}, { "arrayFilters": [{ "elem.email": email }], "multi": true });
  } catch (err) {
    console.log(err)
  }
}