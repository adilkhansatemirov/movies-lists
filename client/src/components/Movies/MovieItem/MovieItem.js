import React from 'react'
import Actions from './Actions/Actions'
import './MovieItem.scss'

function MovieItem({ movie }) {
  return (
    <div className="MovieItem__container">
      <div className="MovieItem__main">
        <h4 className="MovieItem__title">{movie.title}</h4>
        <p>Genre: {movie.genre}</p>
        <p>Released: {movie.year}</p>
        <p>Actors: {movie.actors}</p>
        <Actions movie={movie} />
      </div>
      <img className="MovieItem__poster" src={movie.poster} alt="poster" />
    </div>
  )
}

export default MovieItem
