import React, { createContext, useState } from 'react'

export const IMDBContext = createContext()

export const IMDBProvider = props => {
  const [modalVisible, setModalVisible] = useState(false)
  const [movie, setMovie] = useState(null)

  return (
    <IMDBContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        movie,
        setMovie
      }}
    >
      {props.children}
    </IMDBContext.Provider>
  )
}
