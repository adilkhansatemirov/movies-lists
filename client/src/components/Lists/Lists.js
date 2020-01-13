import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Lists.scss'
import Modal from './Modal/Modal'
import ListItem from './ListItem/ListItem'
import { ListsContext } from './context/lists'

function Lists() {
  const { lists, setLists, modalVisible, setModalVisible } = useContext(
    ListsContext
  )

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios
      .get('/api/lists', { cancelToken: source.token })
      .then(response => {
        setLists(response.data)
      })
      .catch(error => {
        if (axios.isCancel(error)) console.log('Caught cancel request')
        else throw error
      })
    return () => {
      source.cancel()
    }
  }, [setLists])

  const handleAddList = () => {
    setModalVisible(true)
  }

  return (
    <div>
      <h1 className="page-title">My Lists</h1>
      <button className="big-button">
        <Link to="/IMDB" className="link Lists__link">
          Browse Movies
        </Link>
      </button>
      <ul className="Lists__list">
        <li className="button Lists__item">
          <button onClick={handleAddList} className="Lists__action-item">
            New List +
          </button>
        </li>
        {lists.map(list => (
          <li className="button Lists__item" key={list._id}>
            <Link className="Lists__link" to={`/movies/${list._id}`}>
              <ListItem list={list} />
            </Link>
          </li>
        ))}
      </ul>

      {modalVisible && <Modal />}
    </div>
  )
}

export default Lists
