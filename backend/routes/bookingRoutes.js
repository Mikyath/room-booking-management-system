const express = require("express");

const Booking =
require("../models/Booking");

const Room =
require("../models/Room");

const router = express.Router();

router.post(
  "/check-availability",
  async (req, res) => {

    try {

      const {
        roomId,
        checkInDate,
        checkOutDate
      } = req.body;

      const conflictBooking =
      await Booking.findOne({

        roomId,

        checkInDate: {
          $lt: new Date(checkOutDate)
        },

        checkOutDate: {
          $gt: new Date(checkInDate)
        }

      });

      res.json({
        available: !conflictBooking
      });

    }

    catch(error){

      res.status(500).json(error);

    }

  }
);

router.post("/add", async (req,res)=>{

  try{

    const room =
    await Room.findOne({
      roomNumber:req.body.roomNumber
    });

    if(!room){

      return res.status(404).json({
        message:"Room Not Found"
      });

    }

    const conflictBooking =
    await Booking.findOne({

      roomId: room._id,

      checkInDate: {
        $lt: new Date(
          req.body.checkOutDate
        )
      },

      checkOutDate: {
        $gt: new Date(
          req.body.checkInDate
        )
      }

    });

    if(conflictBooking){

      return res.status(400).json({
        message:
        "Room already booked for selected dates"
      });

    }

    const booking =
    await Booking.create({

      ...req.body,

      roomId: room._id

    });

    res.status(201).json(
      booking
    );

  }

  catch(error){

    console.log(error);

    res.status(500).json(error);

  }

});

router.get("/", async (req,res)=>{

  try{

    const bookings =
    await Booking.find();

    res.json(bookings);

  }

  catch(error){

    res.status(500).json(error);

  }

});

router.delete("/:id", async (req,res)=>{

  try{

    const booking =
    await Booking.findById(
      req.params.id
    );

    if(!booking){

      return res.status(404).json({
        message:"Booking Not Found"
      });

    }

    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
      "Booking Cancelled"

    });

  }

  catch(error){

    res.status(500).json(error);

  }

});

module.exports = router;