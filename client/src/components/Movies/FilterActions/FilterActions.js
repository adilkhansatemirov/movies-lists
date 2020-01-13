import React from 'react'

import Sort from './Sort'
import Search from './Search'

import './FilterActions.scss'

function FilterActions() {
  return (
    <div className="FilterActions__actions">
      <Sort />
      <Search />
    </div>
  )
}

export default FilterActions
