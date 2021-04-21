const keys = require("../../config/keys");
const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const {
   createJWT,
} = require("../../utils/auth");


router.post("/register", (req, res) => {
  // Form validation
  let { name, email, password, password_confirmation } = req.body;
   // Form validation
   const { errors, isValid } = validateRegisterInput(req.body);
   // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }
  User.findOne({email: email})
   .then(user=>{
      if(user){
         return res.status(422).json({ errors: [{ user: "email already exists" }] });
         //errors.email = "Email already exists";
        // return alert('Email already exists');
      }else {
         const user = new User({
           name: name,
           email: email,
           password: password,
         });
         bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
})




// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  let { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({
        errors: [{ user: "not found" }],
      });
    } else {
       bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
           return res.status(400).json({ errors: [{ password:
"incorrect" }] 
           });
          }
    let access_token = createJWT(
      user.email,
      user.name,
      user._id,
      3600
    );
    jwt.verify(access_token, keys.secretOrKey, (err,
decoded) => {
      if (err) {
         res.status(500).json({ erros: err });
      }
      if (decoded) {
          return res.status(200).json({
             success: true,
             token: access_token,
             message: user
          });
        }
      });
     }).catch(err => {
       res.status(500).json({ erros: err });
     });
   }
}).catch(err => {
   res.status(500).json({ erros: err });
});
})

 
module.exports = router;

