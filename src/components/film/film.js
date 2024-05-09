import React from 'react'
import './film.css'
import { format } from 'date-fns'

export default function Film({ movie }) {
  if (!movie) return <div className="film" />
  const { poster_path: posterPath, title } = movie
  let { overview, release_date: releaseDate } = movie
  let poster

  if (!posterPath) {
    poster = (
      <div className="film__image">
        <span className="film__blank">NO IMAGE</span>
      </div>
    )
  } else {
    poster = <img className="film__image" src={`https://image.tmdb.org/t/p/original${posterPath}`} alt={title} />
  }

  if (overview.split(' ').length > 35) {
    overview = `${overview.split(' ').slice(0, 35).join(' ')} ...`
  }

  releaseDate = format(new Date(releaseDate), 'MMMM dd, yyyy')
  return (
    <div className="film">
      {poster}
      <div className="info">
        <h5 className="info__heading">{title}</h5>
        <div className="info__date">{releaseDate}</div>
        <div className="info__genres">
          <button type="button" className="info__genre">
            Action
          </button>
          <button type="button" className="info__genre">
            Drama
          </button>
        </div>
        <div className="info__description">{overview}</div>
      </div>
    </div>
  )
}
