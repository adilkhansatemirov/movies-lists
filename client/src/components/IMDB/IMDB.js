import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Movie from './Movie/Movie'
import axios from 'axios'

import Modal from './Modal/Modal'
import { IMDBContext } from './context/imdb'

import './IMDB.scss'

function IMDB() {
  const { modalVisible } = useContext(IMDBContext)
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const page = 1

  const handleChange = event => {
    setSearch(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setNotFound(false)
    axios
      .get(`/api/IMDB/${search}/${page}`)
      .then(response => {
        if (response.data.Response === 'True') {
          setMovies(response.data.Search)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
      .catch(error => {
        throw error
      })
  }

  return (
    <div>
      <h1 className="page-title">
        <Link className="link-back" to="/">
          To Lists
        </Link>
        IMDB
      </h1>
      <form className="IMDB__search-form" onSubmit={handleSubmit}>
        <input
          className="IMDB__search-input"
          type="text"
          autoFocus
          id="IMDB__search"
          onChange={event => handleChange(event)}
        />
        <button
          className="IMDB__search-button"
          disabled={search.length < 3 || loading}
          type="submit"
        >
          {loading ? 'wait' : 'Find'}
        </button>
      </form>
      <p className="IMDB__search-desc">please type minimum 3 characters</p>

      <div className="IMDB__content">
        {loading ? (
          <div>Loading..</div>
        ) : notFound ? (
          <div>No movie was found</div>
        ) : (
          <ul>
            {movies.map(movie => (
              <Movie key={movie.imdbID} movie={movie} />
            ))}
          </ul>
        )}
      </div>
      {modalVisible && <Modal />}
    </div>
  )
}

export default IMDB
