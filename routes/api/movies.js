const express = require('express')
const router = express.Router()

const List = require('../../models/List')
const Movie = require('../../models/Movie')

// get all movies of the user in the list
router.get('/:list_id', async (req, res) => {
  try {
    let list = await List.findOne({ _id: req.params.list_id })
    const movies = await Movie.find({
      _id: { $in: list.movies }
    })
    list.movies = movies

    let sum = 0
    movies.forEach(movie => {
      sum += movie.likes
    })
    list = list.toObject()
    const length = movies.length || 1
    list.averageLikes = Math.round(sum / length)
    res.json(list)
  } catch (error) {
    throw error
  }
})

// sort movies
router.get('/sort/:list_id/:sort_by', async (req, res) => {
  try {
    let list = await List.findOne({ _id: req.params.list_id })
    const movies = await Movie.find({
      _id: { $in: list.movies }
    }).sort({
      [req.params.sort_by]: 1
    })
    res.json(movies)
  } catch (error) {
    throw error
  }
})

// search movies
router.get('/search/:list_id/:title', async (req, res) => {
  try {
    let list = await List.findOne({ _id: req.params.list_id })
    const movies = await Movie.find({
      _id: { $in: list.movies },
      title: req.params.title
    })
    res.json(movies)
  } catch (error) {
    throw error
  }
})

// delete movie from list
router.delete('/:list_id/:movie_id', async (req, res) => {
  const list = await List.findOne({ _id: req.params.list_id })
  let indexToDelete = 0
  list.movies.forEach((movie_id, index) => {
    if (movie_id === req.params.movie_id) indexToDelete = index
  })
  list.movies.splice(indexToDelete, 1)
  await list.save()
  res.json(list)
})

module.exports = router
