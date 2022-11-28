import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import { MoviesContextProvider } from './MoviesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MoviesContextProvider>
      <Router  basename={'/movie-watchlist'}>
        <App />
      </Router>
    </MoviesContextProvider>
  </React.StrictMode>
)
