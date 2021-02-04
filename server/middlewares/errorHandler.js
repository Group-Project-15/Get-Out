const errorhandler = (err, req, res, next) => {
  if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
    let error = err.errors[0].message
    res.status(400).json({error})
  }
  else if(err.name === "custom"){
    res.status(err.status).json({Error: err.msg})
  }
  else{
    let error = err.errors[0].message
    res.status(500).json({error})
  }
}

module.exports = errorhandler