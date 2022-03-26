const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

module.exports.addRoom = async (room) => {
  try {
    if (room.email.length === 2) {
      const chatRooms = await ChatRoom.find({email: {"$all": room.email}});
        const chatRoom = chatRooms.filter(data => data.email.length === 2)
        if (chatRoom.length === 0) {
          const unSeens = [];
          room.email.forEach(data => unSeens.push({email: data}));
          const newChatRoom = new ChatRoom({
            email : room.email,
            unSeens: unSeens
          })
          await newChatRoom.save();
          const user = await User.find({email: {'$in': newChatRoom.email}})
          newChatRoom.user = user;
          return newChatRoom;
        }
    } else {
      const unSeens = [];
      room.email.forEach(data => unSeens.push({email: data}));
      room.unSeens = unSeens;
      const newChatRoom = new ChatRoom(room)
      await newChatRoom.save();
      const user = await User.find({email: {'$in': newChatRoom.email}})
      newChatRoom.user = user;
      return newChatRoom;
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports.addRoom = async (room) => {
  try {
    const newChatRoom = await ChatRoom.findOneAndUpdate({_id: room._id}, room, {new: true});
    const user = await User.find({email: {'$in': newChatRoom.email}})
    newChatRoom.user = user;
    return newChatRoom;
  } catch (err) {
    console.log(err)
  }
}