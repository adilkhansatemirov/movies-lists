import React, { useContext, useState } from 'react'
import { ListsContext } from '../context/lists'
import OutsideAlerter from '../../Shared/OutsideAlerter/OutsideAlerter'
import axios from 'axios'

function Modal() {
  const { setModalVisible, lists, setLists } = useContext(ListsContext)
  const [loading, setLoading] = useState(false)
  const [listName, setListName] = useState('')

  const handleSubmit = event => {
    setLoading(true)
    event.preventDefault()
    axios
      .post('/api/lists', { listName })
      .then(response => {
        setLists([response.data, ...lists])
        console.log(response.data)
        setLoading(false)
        setModalVisible(false)
      })
      .catch(error => {
        setLoading(false)
        throw error
      })
  }

  const handleChange = event => {
    setListName(event.target.value)
  }

  return (
    <div className="Modal__background">
      <OutsideAlerter handleClickOutside={() => setModalVisible(false)}>
        <div className="Modal__body">
          <button onClick={() => setModalVisible(false)}>close</button>
          <h2>Add New List</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              autoFocus
              onChange={event => handleChange(event)}
            />
            <button>Add List</button>
            {loading && <p>loading...</p>}
          </form>
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default Modal