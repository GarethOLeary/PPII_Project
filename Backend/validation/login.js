// used to validate inputs
const Validator = require("validator");
const isEmpty = require("is-empty");

//Export the function validateLoginInput, which takes in data as a parameter 
module.exports = function validateLoginInput(data) {
  //Instantiate our errors object
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //Return our errors object with any and all errors contained
  //isValid checks to see if we have any errors
  return {
    errors,
    isValid: isEmpty(errors)
  };
};