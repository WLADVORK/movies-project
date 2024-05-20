/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react'
import './film-list.css'
import { Alert, Pagination, Spin } from 'antd'
import { Offline } from 'react-detect-offline'

import Film from '../film'
import findFilms from '../../service/find-films/find-films'
import findRatedFilms from '../../service/find-rated-films/find-rated-films'

export default class FilmList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      error: false,
      num: 1,
      total: 0,
      ratings: [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { wordForSearch } = this.props
    const { num } = this.state
    if (prevState.num !== num) {
      this.changeMovies(wordForSearch, num)
    } else if (prevProps.wordForSearch !== wordForSearch) {
      this.changeMovies(wordForSearch, 1)
      this.setState({
        num: 1,
      })
    }
  }

  async changeMovies(word, num) {
    let obj
    try {
      obj = await findFilms(word, num)
      if (obj.movies) {
        this.showRatedFilms(obj.movies)
        this.setState({
          movies: [...obj.movies],
          total: obj.total,
        })
      } else {
        this.setState({
          movies: [],
          total: 0,
        })
      }
    } catch (err) {
      this.setState({
        error: true,
      })
    }
  }

  async showRatedFilms(movies) {
    const { sessionId } = this.props
    const ids = movies.map((item) => item.id)
    const obj = await findRatedFilms(sessionId, 1)
    if (obj.total > 0) {
      const ratedIds = obj.movies.map((item) => item.id)
      const arr = []
      ids.forEach((item, index) => {
        if (ratedIds.includes(item)) {
          const inx = ratedIds.indexOf(item)
          const rate = obj.ratings[inx]
          arr[index] = rate
        }
      })
      this.setState({ ratings: arr })
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
    const { wordForSearch, sessionId } = this.props

    let pagination = true
    let blankPage = null
    if (!wordForSearch && movies.length === 0) {
      blankPage = <div className="film__nofilm">Type something to find movies</div>
    } else if (wordForSearch && movies[0] === 'nodata') {
      blankPage = <div className="film__nofilm">NO RESULTS</div>
    } else if (movies.length === 0) {
      blankPage = (
        <div className="film__nofilm">
          <Spin className="film__spin" size="large" />
        </div>
      )
    }
    if (blankPage) {
      pagination = null
    }
    const filmList = movies.map((item, index) => {
      if (error) {
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
