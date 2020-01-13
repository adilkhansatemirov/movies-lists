const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('config')

router.get('/:title/:page', (req, res) => {
  axios
    .get(
      `http://www.omdbapi.com/?apikey=${config.get('imdbApiKey')}&s=${
        req.params.title
      }&page=${req.params.page}`
    )
    .then(response => {
      res.json(response.data)
    })
})

module.exports = router
