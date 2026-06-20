const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userName: {
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
  }
});

module.exports = mongoose.model("Booking", BookingSchema);