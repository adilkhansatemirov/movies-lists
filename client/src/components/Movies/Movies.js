import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MoviesContext } from './context/movies'
import MovieItem from './MovieItem/MovieItem'
import FilterActions from './FilterActions/FilterActions'
import axios from 'axios'
import './Movies.scss'

function Movies() {
  const { list_id } = useParams()
  const { list, setList, setInitialList } = useContext(MoviesContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios
      .get(`/api/movies/${list_id}`, { cancelToken: source.token })
      .then(response => {
        setInitialList(response.data)
        setList(response.data)
        setLoading(false)
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('cancel request')
        else throw error
      })
    return () => {
      source.cancel()
    }
  }, [list_id, setList, setInitialList])

  return (
    <div>
      <h1 className="page-title">
        <Link className="link-back" to="/">
          To Lists
        </Link>{' '}
        Movies
      </h1>
      <div className="Movies__subtitle-group">
        <h3 className="Movies__subtitle">List: {!loading && list.title}</h3>
        <h3 className="Movies__subtitle">
          Average likes: {!loading && list.averageLikes}
        </h3>
      </div>
      <FilterActions />
      <button className="big-button">
        <Link to="/IMDB" className="link Lists__link">
          Add Movie
        </Link>
      </button>
      {loading ? (
        <div>Loading..</div>
      ) : list.movies.length === 0 ? (
        <div>No movies in list</div>
      ) : (
        list.movies.map(movie => <MovieItem key={movie._id} movie={movie} />)
      )}
    </div>
  )
}

export default Movies
