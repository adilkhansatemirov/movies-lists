import React from 'react' // , { useEffect }
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import axios from 'axios'

import Lists from './components/Lists/Lists'
import IMDB from './components/IMDB/IMDB'
import Movies from './components/Movies/Movies'

import { IMDBProvider } from './components/IMDB/context/imdb'
import { ListsProvider } from './components/Lists/context/lists'
import { MoviesProvider } from './components/Movies/context/movies'

import './App.scss'

const App = () => {
  return (
    <div className="container">
      <Router>
        <ListsProvider>
          <Route exact path="/" component={Lists} />
        </ListsProvider>
        <MoviesProvider>
          <Route path="/movies/:list_id" component={Movies} />
        </MoviesProvider>
        <IMDBProvider>
          <Route path="/imdb" component={IMDB} />
        </IMDBProvider>
      </Router>
    </div>
  )
}

export default App
