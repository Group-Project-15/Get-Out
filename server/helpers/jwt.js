const jwt = require('jsonwebtoken')
// const secretKey = process.env.JWT_KEY
// console.log(process.env.SECRET);

function generateToken(payload) {
    return jwt.sign(payload, "secretKey")
}

function checkToken(access_token) {
    return jwt.verify(access_token, "secretKey")
}
  
module.exports = {
    generateToken,
    checkToken
}