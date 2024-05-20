/* eslint-disable object-curly-newline */
import React from 'react'
import './film.css'
import { format } from 'date-fns'
import { Spin, Rate, ConfigProvider } from 'antd'
import { AsyncImage } from 'loadable-image'

import RateFilm from '../../service/rate-film/rate-film'
import GenresContext from '../../service/create-context/create-context'

export default function Film({ movie, sessionId, rating }) {
  if (!movie) {
    return (
      <div className="film">
        <Spin className="film__spin" size="large" />
      </div>
    )
  }
  const { poster_path: posterPath, title, id, genre_ids: genreIds } = movie
  let { overview, release_date: releaseDate, vote_average: voteAverage } = movie
  let poster
  let ratingColor

  if (!posterPath) {
    poster = (
      <div className="info__image">
        <span className="film__blank">NO IMAGE</span>
      </div>
    )
  } else {
    poster = (
      <AsyncImage
        className="info__image"
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        alt={title}
        loader={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div className="info__image">
            <Spin />
          </div>
        }
      />
    )
  }

  if (!overview) {
    overview = ''
  } else if (overview.split(' ').length > 20) {
    overview = `${overview.split(' ').slice(0, 20).join(' ')} ...`
  }

  if (releaseDate) {
    releaseDate = format(new Date(releaseDate), 'MMMM dd, yyyy')
  } else {
    releaseDate = 'No data'
  }

  if (voteAverage) {
    voteAverage = voteAverage.toFixed(1)
    if (voteAverage <= 3) {
      ratingColor = 'info__rating--bad'
    } else if (voteAverage <= 5) {
      ratingColor = 'info__rating--middle'
    } else if (voteAverage <= 7) {
      ratingColor = 'info__rating--good'
    } else {
      ratingColor = 'info__rating--awesome'
    }
  }

  return (
    <GenresContext.Consumer>
      {(genres) => {
        const genreNames = genreIds.map((item) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const genre of genres.genres) {
            if (genre.id === item) {
              return (
                <button type="button" className="info__genre">
                  {genre.name}
                </button>
              )
            }
          }
          return undefined
        })

        return (
          <div className="film">
            <div className="info">
              {poster}
              <h5 className="info__heading">{title}</h5>
              <div className={`info__rating ${ratingColor}`}>{voteAverage}</div>
              <div className="info__date">{releaseDate}</div>
              <div className="info__genres">{genreNames}</div>
              <div className="info__description">{overview}</div>
              <ConfigProvider
                theme={{
                  token: {
                    marginXS: 3,
                  },
                }}
              >
                <Rate
                  className="info__rate"
                  allowHalf
                  value={rating}
                  count={10}
                  onChange={(value) => {
                    RateFilm(value, sessionId, id)
                  }}
                />
              </ConfigProvider>
            </div>
          </div>
        )
      }}
    </GenresContext.Consumer>
  )
}
