import React from 'react'

import './film-list.css'
import Film from '../film'

export default class FilmList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
    }
    this.changeMovies()
  }

  async changeMovies() {
    const { filmsArr } = this.props
    const arr = await filmsArr()
    this.setState({
      movies: [...arr],
    })
  }

  render() {
    const { movies } = this.state
    return (
      <div className="filmList">
        <Film movie={movies[0]} />
        <Film movie={movies[1]} />
        <Film movie={movies[2]} />
        <Film movie={movies[3]} />
        <Film movie={movies[4]} />
        <Film movie={movies[5]} />
      </div>
    )
  }
}
