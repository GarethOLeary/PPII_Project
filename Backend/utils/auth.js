const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// method to sign a jwt token including our payload, expiry time, and token secret.
exports.createJWT = (email, name, userId, duration) => {
   const payload = {
      email,
      name,
      userId,
      duration
   };
   // Sign token
   return jwt.sign(payload, keys.secretOrKey, {
      expiresIn: duration,
   });
};