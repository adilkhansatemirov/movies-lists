const express = require('express')
const router = express.Router()

const Movie = require('../../models/Movie')

router.put('/:movie_id', async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.movie_id })
    let change = movie.liked ? -1 : 1
    movie.likes = movie.likes + change
    movie.liked = !movie.liked
    await movie.save()
    res.json(movie)
  } catch (error) {
    throw error
  }
})

module.exports = router
