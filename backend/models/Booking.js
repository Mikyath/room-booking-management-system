const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

  roomId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Room",
  required: true
  },

  userName: {
    type: String,
    required: true
  },

  userEmail: {
  type: String,
  required: true
  },

  roomNumber: {
    type: String,
    required: true
  },

  bookingDate: {
    type: Date,
    required: true
  },

  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
  type: String,
  default: "Cash"
  },

});

module.exports = mongoose.model(
  "Booking",
  BookingSchema
);