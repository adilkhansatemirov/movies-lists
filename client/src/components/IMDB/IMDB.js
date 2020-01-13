import React, { useState, useContext } from 'react'
import Movie from './Movie/Movie'
import axios from 'axios'

import Modal from './Modal/Modal'
import { IMDBContext } from './context/imdb'

function IMDB() {
  const { modalVisible } = useContext(IMDBContext)
  const [search, setSearch] = useState('')
  //   const [page, setpage] = useState(1)
  const page = 1
  const [movies, setMovies] = useState([])

  const handleChange = event => {
    setSearch(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios
      .get(`/api/IMDB/${search}/${page}`)
      .then(response => {
        console.log(response.data.Search)
        setMovies(response.data.Search)
      })
      .catch(error => {
        throw error
      })
  }

  return (
    <div>
      <h1 className="page-title">IMDB</h1>
      <div className="IMDB__search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus
            id="IMDB__search"
            onChange={event => handleChange(event)}
          />
          <button disabled={search.length < 3} type="submit">
            Find
          </button>
        </form>
        <p>please type minimum 3 characters</p>
      </div>

      <ul>
        {movies.map(movie => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </ul>
      {modalVisible && <Modal />}
    </div>
  )
}

export default IMDB
