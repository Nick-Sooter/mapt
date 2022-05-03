const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// login




// register
// Have to be careful here - schema calls for a password field, but if password is listed, it will be shown in database (not secure)
// install bcrypt - library to help hash passwords
// require bcrypt above
router.pot('/register', async (req, res) => {
  try {
    // generate new password

    // create new user

    // save user and send response

  } catch (err) {
    res.status(500).json(err)
  }
})



module.exports = router;