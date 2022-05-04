const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// if there's time, refactor code for error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
// due to timing error in handling of async response
// https://stackoverflow.com/questions/34983520/express-js-routing-error-cant-set-headers-after-they-are-sent


// login
// POST - http://localhost:4000/api/users/login
router.post('/login', async (req, res) => {
  try {
    // find user and handle incorrect credentials
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(400).json('Incorrect username or password');

    // validate password and handle incorrect credentials
    const validPass = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPass && res.status(400).json('Incorrect username or password');

    // send response for valid login
    res.status(200).json(user.username);

  } catch (err) {
    res.status(500).json(err);
  }
})



// register
// install bcrypt - library to help hash passwords so pass is not shown in db
// require bcrypt above
// see Usage section at npmjs.com/package/bcrypt


// http://localhost:4000/api/users/register
// hashed password confirmed in Mongo Atlas
router.post('/register', async (req, res) => {
  try {
    // generate new password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // save user and send response
    const user = await newUser.save();
    res.status(200).json(user.username);
  } catch (err) {
    res.status(500).json(err)
  }
});



module.exports = router;