const express = require("express");
const multer = require("multer");
const Room = require("../models/Room");
const router = express.Router();
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );

  }

});

const upload = multer({storage});

router.post("/add",
upload.array("images", 10),
  async (req, res) => {

    try {

      const room = await Room.create({

        roomNumber:
          req.body.roomNumber,

        roomType:
          req.body.roomType,

        capacity:
          req.body.capacity,

        price:
          req.body.price,

        images:
          req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : []

      });

      res.status(201).json(room);

    }

    catch (error) {

      res.status(500).json(error);

    }

  }
);

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