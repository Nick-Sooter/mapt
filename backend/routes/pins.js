const router = require('express').Router();
const Pin = require('../models/Pin');

// get all pins
// GET - http://localhost:4000/api/pins
router.get('/', async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins)
  } catch (err) {
    res.status(500).json(err)
  }
})


// create pin

// title, desc, rating, etc will be sent in req.body
// use async/await - it will have to connect to the db and then add a new pin, which will take a couple seconds. Without async/await it will try to save a new pin before one is availible

// add new pin
// POST - http://localhost:4000/api/pins
router.post('/', async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;