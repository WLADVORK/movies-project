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
    let notFull = false
    if (movies.length > 0 && movies.length < 20) {
      notFull = true
    }
    if (movies.length > 0 && !movies[0]) {
      blankPage = <div className="film__nofilm" />
    }

    if (blankPage) {
      pagination = null
    }
    return (
      <div className="filmList">
        <Offline>
          <Alert className="errorMessage" message="Отсутствует подключение к Интернету" type="error" />
        </Offline>
        {blankPage || [
          error ? <Alert className="errorMessage" message="Ошибка загрузки" type="error" /> : null,
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[0]} notFull={notFull} key={1} rating={ratings[0]} sessionId={sessionId} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[1]} notFull={notFull} rating={ratings[1]} key={2} sessionId={sessionId} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[2]} notFull={notFull} key={3} rating={ratings[2]} sessionId={sessionId} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[3]} notFull={notFull} key={4} sessionId={sessionId} rating={ratings[3]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[4]} notFull={notFull} key={5} sessionId={sessionId} rating={ratings[4]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[5]} notFull={notFull} key={6} sessionId={sessionId} rating={ratings[5]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[6]} notFull={notFull} key={7} sessionId={sessionId} rating={ratings[6]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[7]} notFull={notFull} key={8} sessionId={sessionId} rating={ratings[7]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[8]} notFull={notFull} key={9} sessionId={sessionId} rating={ratings[8]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[9]} notFull={notFull} key={10} sessionId={sessionId} rating={ratings[9]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[10]} notFull={notFull} key={11} sessionId={sessionId} rating={ratings[10]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[11]} notFull={notFull} key={12} sessionId={sessionId} rating={ratings[11]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[12]} notFull={notFull} key={13} sessionId={sessionId} rating={ratings[12]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[13]} notFull={notFull} key={14} sessionId={sessionId} rating={ratings[13]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[14]} notFull={notFull} key={15} sessionId={sessionId} rating={ratings[14]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[15]} notFull={notFull} key={16} sessionId={sessionId} rating={ratings[15]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[16]} notFull={notFull} key={17} sessionId={sessionId} rating={ratings[16]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[17]} notFull={notFull} key={18} sessionId={sessionId} rating={ratings[17]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[18]} notFull={notFull} key={19} sessionId={sessionId} rating={ratings[18]} />
          ),
          error ? (
            errorFilm
          ) : (
            <Film movie={movies[19]} notFull={notFull} key={20} sessionId={sessionId} rating={ratings[19]} />
          ),
        ]}
        {pagination && (
          <Pagination
            className="filmList__pagination"
            defaultCurrent={1}
            current={num}
            onChange={(value) => {
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
