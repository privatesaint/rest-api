const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
const User = require('./models/User');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // get user email
      const user = await User.findOne({
        email
      });
      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          resolve(user);
        } else {
          // Password didn't match
          reject('Authentication Failed');
        }
      });
    } catch (err) {
      // Email not found
      reject('Authentication Failed');
    }
  });
};
