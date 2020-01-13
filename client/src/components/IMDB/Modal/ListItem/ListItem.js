import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ListItem.scss'

function ListItem({ list, movie }) {
  const [contains, setContains] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios
      .get(`/api/movies/${list._id}`, { cancelToken: source.token })
      .then(response => {
        response.data.movies.forEach(movieFromList => {
          if (movieFromList.imdbID === movie.imdbID) setContains(true)
        })
        setLoading(false)
        console.log(response.data)
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('Caught cancel request')
        else throw error
      })
    return () => {
      source.cancel()
    }
  }, [list._id, movie.imdbID])

  const handleAdd = () => {
    setLoading(true)
    axios
      .put('/api/lists', { list_id: list._id, movie })
      .then(() => {
        setContains(true)
        setLoading(false)
      })
      .catch(error => {
        throw error
      })
  }

  return (
    <li className="ListItem__item">
      <p>{list.title}</p>
      <button disabled={contains || loading} onClick={handleAdd}>
        {loading ? 'wait' : `${contains ? 'already there' : 'add'}`}
      </button>
    </li>
  )
}

export default ListItem
