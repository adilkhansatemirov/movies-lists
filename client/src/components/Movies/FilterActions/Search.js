import React, { useContext } from 'react'
import { MoviesContext } from '../context/movies'

function Search() {
  const { initialList, list, setList } = useContext(MoviesContext)

  const handleChange = event => {
    const pattern = new RegExp(event.target.value, 'i')
    const filtered = initialList.movies.filter(movie =>
      pattern.test(movie.title)
    )
    const updatedList = { ...list, movies: filtered }
    setList(updatedList)
  }
  return (
    <form className="FilterActions__filter">
      <label htmlFor="FilterActions__filter-input">Fiter by title</label>
      <input
        className="FilterActions__filter-input"
        id="FilterActions__filter-input"
        onChange={handleChange}
        type="text"
      />
    </form>
  )
}

export default Search
