import React, { useContext } from 'react'
import { IMDBContext } from '../../context/imdb'
import './Actions.scss'

function Actions({ movie }) {
  const { setModalVisible, setMovie } = useContext(IMDBContext)

  const handleClick = () => {
    setModalVisible(true)
    setMovie(movie)
  }

  return (
    <div className="ActionsIMDB__item">
      <button onClick={handleClick}>add to list</button>
    </div>
  )
}

export default Actions
