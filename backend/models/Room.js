const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },

  roomType: {
    type: String,
    required: true
  },

  capacity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

 images: {
  type: [String],
  default: []
},

  isBooked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model(
  "Room",
  RoomSchema
);