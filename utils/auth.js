const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
exports.createJWT = (email, name,userId, duration) => {
   const payload = {
      email,
      name,
      userId,
      duration
   };
   return jwt.sign(payload, keys.secretOrKey, {
     expiresIn: duration,
   });
};