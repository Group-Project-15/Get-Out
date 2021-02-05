const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_KEY


function generateToken(payload) {
    console.log(secretKey, "<<<<<KEY");
    return jwt.sign(payload, secretKey)
}

function checkToken(access_token) {
    console.log(secretKey, "<<<<<KEY");
    return jwt.verify(access_token, secretKey)
}
  
module.exports = {
    generateToken,
    checkToken
}