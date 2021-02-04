const { User } = require('../models')
const { checkToken } = require('../helpers/jwt')


function authenticate(req, res, next) {
    try {
      const decode = checkToken(req.headers.access_token)
      const email = decode.email
      User.findOne({
        where: {email}
      })
      .then(data => {
        if(data) {
          req.user = {
            id: data.id,
            email: data.email
          }
          next()
        } else res.status(401).json({msg: `User not Authorized`})
      })
    } catch (err) {
        res.status(400).json({msg: `Data not found`})
    }
}

module.exports = authenticate