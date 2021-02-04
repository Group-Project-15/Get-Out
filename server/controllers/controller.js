const axios = require("axios")

class Controller {
  //-------------Weather API----------------
  static weather(req, res, next){
    axios.get()
    .then(data => {

    })
    .catch(err => {
      next(err)
    })
  }

  //-------------Air API----------------
  static air(req, res, next){
    axios.get()
    .then(data => {

    })
    .catch(err => {
      next(err)
    })
  }

  //-------------News API----------------
  static news(req, res, next){
    axios.get()
    .then(data => {

    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller