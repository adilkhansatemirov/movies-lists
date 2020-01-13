import React, { createContext, useState } from 'react'

export const MoviesContext = createContext()

export const MoviesProvider = props => {
  const [modalVisible, setModalVisible] = useState(false)
  const [list, setList] = useState(null)
  const [initialList, setInitialList] = useState(null)

  return (
    <MoviesContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        list,
        setList,
        initialList,
        setInitialList
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  )
}
