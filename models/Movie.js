const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  actors: {
    type: String,
    required: true
  },
  imdbID: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  liked: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('movie', MovieSchema)
