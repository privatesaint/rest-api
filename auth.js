const bcrypt = require("bcryptjs");
// const mongooose = require("mongoose");
const User = require("./models/User");

exports.authenticate = (email, password) => {
    return Promise(async (resolve, reject) => {
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
            })
        } catch (err) {
            // Email not found
            reject('Authentication Failed');
        }
    })
}