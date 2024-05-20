/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react'
import './rated-list.css'
import { Alert, Pagination } from 'antd'
import { Offline } from 'react-detect-offline'

import Film from '../film'
import findRatedFilms from '../../service/find-rated-films/find-rated-films'

export default class Rated extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [null],
      error: false,
      num: 1,
      total: 0,
      ratings: null,
    }
  }

  componentDidMount() {
    const { num } = this.state
    this.changeMovies(num)
  }

  componentDidUpdate(prevProps, prevState) {
    const { num } = this.state
    if (prevState.num !== num) {
      this.changeMovies(num)
    }
  }

  async changeMovies(num) {
    const { sessionId } = this.props
    let obj
    try {
      obj = await findRatedFilms(sessionId, num)
      this.setState({
        movies: [...obj.movies],
        total: obj.total,
        ratings: obj.ratings,
      })
    } catch (err) {
      this.setState({
        error: true,
      })
    }
  }

  render() {
    const errorFilm = (
      <div className="film">
        <div className="film__image">
          <span className="film__blank" />
        </div>
        <div className="info" />
      </div>
    )
    const { movies, error, total, num, ratings } = this.state
    const { sessionId } = this.props
    let pagination = true
    let blankPage = null

    if (movies.length > 0 && !movies[0]) {
      blankPage = <div className="film__nofilm" />
    }

    if (blankPage) {
      pagination = null
    }

    const filmList = movies.map((item, index) => {
      if (error || !ratings) {
        return errorFilm
      }
      // eslint-disable-next-line react/no-array-index-key
      return <Film movie={item} key={index + 1} rating={ratings[index]} sessionId={sessionId} />
    })

    return (
      <div className="filmList">
        <Offline>
          <Alert className="errorMessage" message="Отсутствует подключение к Интернету" type="error" />
        </Offline>
        {blankPage || [
          error ? <Alert className="errorMessage" message="Ошибка загрузки" type="error" /> : null,
          ...filmList,
        ]}
        {pagination && (
          <Pagination
            className="filmList__pagination"
            defaultCurrent={1}
            current={num}
            onChange={(value) => {
              window.scrollTo(0, 0)
              this.setState({
                num: value,
              })
            }}
            pageSize={20}
            showSizeChanger={false}
            total={total}
          />
        )}
      </div>
    )
  }
}
