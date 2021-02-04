const { User } = require('../models')
const { checkToken } = require('../helpers/jwt')
const jwt = require("jsonwebtoken")

function authenticate(req, res, next) {
    try {
      let access_token = req.headers.access_token
      let decode = checkToken(access_token)
      req.decode = decode
      next()
    } catch (err) {
      next({name: "custom", msg: "Invalid token", status: 401})
    }
}

module.exports = authenticate