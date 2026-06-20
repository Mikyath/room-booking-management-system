const express = require("express");

const Booking =
require("../models/Booking");

const Room =
require("../models/Room");

const router = express.Router();

router.post("/add", async (req,res)=>{

  try{

    const room =
await Room.findOne({
roomNumber:req.body.roomNumber
});

if(room.isBooked){

return res.status(400).json({
message:"Room Already Booked"
});

}

const booking =
await Booking.create(req.body);

room.isBooked = true;

await room.save();

res.status(201).json(booking);
  }

  catch(error){

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

    const room =
    await Room.findOne({

      roomNumber:
      booking.roomNumber

    });

    if(room){

      room.isBooked = false;

      await room.save();

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