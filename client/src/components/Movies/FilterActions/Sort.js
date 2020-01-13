import React, { useState, useContext } from 'react'
import axios from 'axios'
import { MoviesContext } from '../context/movies'

function Sort() {
  const [loading, setLoading] = useState(false)
  const { list, setList } = useContext(MoviesContext)
  const [sortBy, setSortBy] = useState('none')

  const handleSubmit = event => {
    setLoading(true)
    event.preventDefault()
    axios
      .get(`/api/movies/sort/${list._id}/${sortBy}`)
      .then(response => {
        const updatedList = { ...list, movies: response.data }
        setList(updatedList)
        setLoading(false)
      })
      .catch(error => {
        throw error
      })
  }
  const handleChange = event => {
    setSortBy(event.target.value)
  }
  return (
    <form className="FilterActions__sort" onSubmit={handleSubmit}>
      <label htmlFor="FilterActions__sort-select">Sort by</label>
      <select
        id="FilterActions__sort-select"
        className="FilterActions__sort-select"
        value={sortBy}
        onChange={handleChange}
      >
        <option value="none">none</option>
        <option value="title">title</option>
        <option value="likes">likes</option>
      </select>
      <button disabled={sortBy === 'none' || loading} type="submit">
        {loading ? 'wait' : 'apply'}
      </button>
    </form>
  )
}

export default Sort
