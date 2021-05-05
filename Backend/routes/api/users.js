//required dependencies
const keys = require("../../config/keys");
const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const {
  createJWT,
} = require("../../utils/auth");

router.post("/register", (req, res) => {
  // Form validation
  let { name, email, password, password_confirmation } = req.body;
  //Pull the errors and isValid variables from our validateRegisterInput(req.body) function and check input validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //If valid input, use MongoDB’s User.findOne() to see if the user already exists
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.status(422).json({ errors: [{ user: "email already exists" }] });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
        });
        //bcrypt used to hash the password before storing it in your database
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            // Save data(name, email, and password) in MongoDB.
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
    }).catch(err => {
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
    })
})

// Login user and return JWT token
router.post("/login", (req, res) => {
  // Form validation
  let { email, password } = req.body;
  //Pull the errors and isValid variables from our validateLoginInput(req.body) function and check input validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //If valid input, use MongoDB’s User.findOne() to see if the user exists
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({
        errors: [{ user: "not found" }],
      });
    } else {
      // If user exists, use bcrypt to compare submitted password with hashed password in our database
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json({
            errors: [{
              password:
                "incorrect"
            }]
          });
        }
        //If passwords match, create our JWT Payload
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
            // If it succeeds send the token in our response with success status(200) and user information.
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

