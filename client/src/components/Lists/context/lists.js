import React, { createContext, useState } from 'react'

export const ListsContext = createContext()

export const ListsProvider = props => {
  const [modalVisible, setModalVisible] = useState(false)
  const [lists, setLists] = useState([])

  return (
    <ListsContext.Provider
      value={{
        modalVisible,
        setModalVisible,
        lists,
        setLists
      }}
    >
      {props.children}
    </ListsContext.Provider>
  )
}
