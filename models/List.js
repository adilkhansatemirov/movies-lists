const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  movies: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('list', ListSchema)
