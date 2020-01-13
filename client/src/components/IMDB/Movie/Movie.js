import React from 'react'
import Actions from './Actions/Actions'
import './Movie.scss'

function Movie({ movie }) {
  return (
    <li className="MovieIMDB__item">
      <div className="MovieIMDB__main">
        <h3 className="MovieIMDB__title">{movie.Title}</h3>
        <div>Released: {movie.Year}</div>
        <div>Type: {movie.Type}</div>
        <Actions movie={movie} />
      </div>
      <img className="MovieIMDB__poster" src={movie.Poster} alt="poster" />
    </li>
  )
}

export default Movie
