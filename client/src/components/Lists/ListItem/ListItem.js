import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ListItem.scss'

function ListItem({ list }) {
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios
      .get(`/api/movies/${list._id}`, { cancelToken: source.token })
      .then(response => {
        setLikes(response.data.averageLikes)
        setLoading(false)
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('Caught cancel request')
        else throw error
      })
    return () => {
      console.log('unmouting list item')
      source.cancel()
    }
  }, [list._id])

  return (
    <>
      <h4>{list.title}</h4>
      <div>Movies: {list.movies.length}</div>
      <div>Average Likes: {loading ? 'calculating' : likes}</div>
    </>
  )
}

export default ListItem
