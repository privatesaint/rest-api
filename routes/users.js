const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const Config = require('../config');

// parse application/json
const jsonBodyParser = bodyParser.json();
module.exports = app => {
  app.post('/register', jsonBodyParser, (req, res) => {
    const { email, password } = req.body;
    const user = new User({
      email,
      password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;
        // save user
        try {
          const newUser = await user.save();
          return res.status(201).json({
            success: true
          });
        } catch (err) {
          return res.send(new errors.InternalError(err.message));
        }
      });
    });
  });
  //   Authentication
  app.post('/auth', jsonBodyParser, async (req, res) => {
    const { email, password } = req.body;
    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);

      // Create JWT
      const token = jwt.sign(user.toJSON(), Config.JWT_SECRET, {
        expiresIn: '15m'
      });

      //   destructure issued at and expired at from jwt token
      const { iat, exp } = jwt.decode(token);
      //   Return response with token
      return res.send({ iat, exp, token });
    } catch (err) {
      //   AUthentication fails
      return res.send(new errors.UnauthorizedError(err));
      //   return res.send(err);
    }
  });
};
