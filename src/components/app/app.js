import React from 'react'
import './app.css'

import FilmList from '../film-list'

export default function App() {
  const findFilms = async () => {
    const response = await fetch('https://api.themoviedb.org/3/search/movie?query=return&include_adult=true&page=1', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjg4ZGE2YTE0ZjYyMGVkNDBhZWY2M2U2ODY4ODY5YyIsInN1YiI6IjY2M2I4YzE0NzcxZGEyNzUwNjNjMjMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RB0eEv4qtHx1qOWP4rcs0Btn3NX9qcOyfDSBD5nc2JI',
        accept: 'application/json',
      },
    })
    const json = await response.json()
    const res = json.results
    res.length = 6
    return res
  }

  return <FilmList filmsArr={findFilms} />
}
