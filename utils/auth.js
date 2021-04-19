const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, keys.secretOrKey, {
     expiresIn: duration,
   });
};