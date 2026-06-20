const express = require("express");

const Room = require("../models/Room");

const router = express.Router();

router.post("/add", async (req, res) => {

  try {

    const room = await Room.create(req.body);

    res.status(201).json(room);

  } catch (error) {

    res.status(500).json(error);

  }

});

router.get("/", async (req, res) => {

  try {

    const rooms = await Room.find();

    res.json(rooms);

  } catch (error) {

    res.status(500).json(error);

  }

});
router.delete("/:id", async (req, res) => {

  try {

    await Room.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Room Deleted"
    });

  } catch (error) {

    res.status(500).json(error);

  }

});

router.put("/:id", async (req,res)=>{

  try{

    const room =
    await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );

    res.json(room);

  }

  catch(error){

    res.status(500).json(error);

  }

});
module.exports = router;