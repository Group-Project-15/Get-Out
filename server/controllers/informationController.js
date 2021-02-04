const axios = require("axios")

class InformationController {
  static fetchWeather(req, res, next) {
    const location = req.decode.location || "Jakarta"
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.OPEN_WEATHER_APIKEY}`
    axios
      .get(apiURL)
      .then(response => {
        const localweather = {
          weather: response.data.weather[0].main,
          temp: response.data.main.temp,
          city: response.data.name
        }

        res.status(200).json(localweather)
      })
      .catch(err => {
        next(err)
      })
  }

  static fetchAir(req, res, next) {
    const city = req.query.city || "Jakarta"
    let state
    if (city === "Jakarta") state = "Jakarta"
    else if (city === "Bandung") state = "West Java"
    else if (city === "Surabaya") state = "East Java"
    const apiURL = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=Indonesia&key=${process.env.IQAIR_APIKEY}`
    axios
      .get(apiURL)
      .then(response => {
        const aqius = response.data.data.current.pollution.aqius
        let index
        let color
        if (aqius <= 50) {
          index = "Good",
            color = "green"
        }
        else if (aqius <= 100) {
          index = "Moderate"
          color = "yellow"
        }
        else if (aqius <= 150) {
          index = "Unhealthy for Some"
          color = "orange"
        }
        else if (aqius <= 200) {
          index = "Unhealthy"
          color = "red"
        }
        else if (aqius <= 300) {
          index = "Very Unhealthy"
          color = "purple"
        }
        else if (aqius > 301) {
          index = "Hazardous"
          color = "marooon"
        }

        const air = {
          aqius,
          index,
          color
        }

        res.status(200).json(air)
      })
      .catch(err => {
        next(err)
      })
  }

  static fetchNews(req, res, next) {
    const apiURL = `https://api.currentsapi.services/v1/latest-news?country=ID&apiKey=${process.env.CURRENTS_APIKEY}`
    axios
      .get(apiURL)
      .then(response => {
        const news = response.data.news.slice(0, 3).map(el => {
          return {
            title: el.title,
            published: el.published,
            url: el.url,
            image: el.image
          }
        })
        res.status(200).json(news)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = InformationController