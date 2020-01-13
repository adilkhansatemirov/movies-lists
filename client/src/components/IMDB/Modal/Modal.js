import React, { useEffect, useState, useContext } from 'react'
import OutsideAlerter from '../../Shared/OutsideAlerter/OutsideAlerter'
import ListItem from './ListItem/ListItem'

import axios from 'axios'
import { IMDBContext } from '../context/imdb'

function Modal() {
  const { movie, setModalVisible } = useContext(IMDBContext)
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios
      .get('/api/lists', { cancelToken: source.token })
      .then(response => {
        setLoading(false)
        console.log(response.data)
        setLists(response.data)
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('Caught cancel request')
        else throw error
      })
    return () => {
      source.cancel()
    }
  }, [])

  return (
    <div className="Modal__background">
      <OutsideAlerter handleClickOutside={() => setModalVisible(false)}>
        <div className="Modal__body">
          <button
            className="Modal__close-button"
            onClick={() => setModalVisible(false)}
          >
            x
          </button>
          <h3 className="Modal__title">{movie.Title}</h3>
          {loading ? (
            <div>wait</div>
          ) : (
            <ul className="Modal__list-list">
              {lists.map(list => (
                <ListItem key={list._id} list={list} movie={movie} />
              ))}
            </ul>
          )}
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default Modal
