const bodyParser = require('body-parser');
const User = require('../models/User');
const errors = require('restify-errors');
const bcrypt = require('bcryptjs');

// parse application/json
const jsonBodyParser = bodyParser.json();
module.exports = app => {
  app.get('/register', jsonBodyParser, (req, res) => {
    return res.send('he');
    // const { email, password } = req.body;
    // const user = new User({
    //   email,
    //   password
    // });
    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(user.password, salt, async (err, hash) => {
    //     user.password = hash;
    //     // save user
    //     try {
    //       const newUser = await user.save();
    //       return res.send(201).json({ success: true });
    //     } catch (err) {
    //       return res.send(new errors.InternalError(err.message));
    //     }
      });
    });
  });
};
