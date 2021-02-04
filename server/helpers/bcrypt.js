const bcrypt = require("bcryptjs")

function hashPass(password){
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  return hash
}

function comparePass(password, hashedPass){
  return bcrypt.compareSync(password, hashedPass);
}

module.exports = {hashPass, comparePass}