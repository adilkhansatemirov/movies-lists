const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true, limit: '15mb' }))

// db config
const db = config.get('mongoURI')

// connect to Mongo
mongoose
  .connect(db, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Mongo conected..'))
  .catch(err => console.log(err))

app.use('/api/lists', require('./routes/api/lists'))
app.use('/api/IMDB', require('./routes/api/IMDB'))
app.use('/api/movies', require('./routes/api/movies'))
app.use('/api/likes', require('./routes/api/likes'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Sever started on ${port} port`))
