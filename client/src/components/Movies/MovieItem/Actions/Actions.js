import React, { useContext, useState } from 'react'
import { MoviesContext } from '../../context/movies'
import './Actions.scss'
import axios from 'axios'

function Actions({ movie }) {
  const { list, setList } = useContext(MoviesContext)
  const [loadingLike, setLoadingLike] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const handleDelete = () => {
    setLoadingDelete(true)
    axios
      .delete(`/api/movies/${list._id}/${movie._id}`)
      .then(() => {
        const updatedMovies = list.movies.filter(
          movieFromList => movieFromList._id !== movie._id
        )
        const updatedList = { ...list, movies: updatedMovies }
        setList(updatedList)
      })
      .catch(error => {
        throw error
      })
  }

  const handleLike = () => {
    setLoadingLike(true)
    axios
      .put(`/api/likes/${movie._id}`)
      .then(response => {
        setLoadingLike(false)
        let updatedMovies = [...list.movies].map(movieFromList =>
          movieFromList._id === movie._id ? response.data : movieFromList
        )
        const updatedList = { ...list, movies: updatedMovies }
        setList(updatedList)
        console.log(response.data)
      })
      .catch(error => {
        throw error
      })
  }

  return (
    <div>
      <button
        className={movie.liked ? 'like--liked' : ''}
        onClick={handleLike}
        disabled={loadingLike}
      >
        <span>
          {loadingLike ? 'wait' : `${movie.liked ? 'Unlike' : 'Like'}`}
        </span>
        {movie.likes}
      </button>
      <button disabled={loadingDelete} onClick={handleDelete}>
        {loadingDelete ? 'wait' : 'Delete'}
      </button>
    </div>
  )
}

export default Actions
