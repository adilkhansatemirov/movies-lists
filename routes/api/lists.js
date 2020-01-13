const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('config')

const List = require('../../models/List')
const Movie = require('../../models/Movie')

// get all lists of the user
router.get('/', (req, res) => {
  List.find().then(lists => {
    res.json(lists)
  })
})

// add new list
router.post('/', (req, res) => {
  const list = new List({
    title: req.body.listName,
    movies: []
  })

  list.save().then(list => {
    res.json(list)
  })
})

// create a movie and add it to the list
router.put('/', async (req, res) => {
  try {
    // get full info
    const movie = await axios.get(
      `http://www.omdbapi.com/?apikey=${config.get('imdbApiKey')}&i=${
        req.body.movie.imdbID
      }`
    )

    const movieExisting = await Movie.findOne(
      { imdbID: movie.data.imdbID },
      { _id: 1 }
    )

    let movieId

    if (movieExisting === null) {
      // construct movie object
      const movieNew = new Movie({
        title: movie.data.Title,
        year: movie.data.Year,
        genre: movie.data.Genre,
        actors: movie.data.Actors,
        imdbID: movie.data.imdbID,
        poster: movie.data.Poster,
        likes: 10 + Math.round(Math.random() * 20)
      })
      movieId = movieNew._id

      await movieNew.save()
    } else {
      movieId = movieExisting._id
    }

    // update list
    const listToUpdate = await List.findOne({ _id: req.body.list_id })
    listToUpdate.movies.push(movieId)
    await listToUpdate.save()

    res.send(listToUpdate)
  } catch (error) {
    throw error
  }
})

module.exports = router
