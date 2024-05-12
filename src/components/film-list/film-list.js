import React from 'react'
import './film-list.css'
import { Alert, Pagination } from 'antd'
import { Offline } from 'react-detect-offline'

import Film from '../film'
import findFilms from '../../service/find-films/find-films'

export default class FilmList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      error: false,
      num: 1,
    }
  }

  componentDidUpdate() {
    const { wordForSearch } = this.props
    const { num } = this.state
    this.changeMovies(wordForSearch, num)
  }

  async changeMovies(word, num) {
    let arr
    try {
      arr = await findFilms(word, num)
      this.setState({
        movies: [...arr],
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
    const { movies, error } = this.state
    const { wordForSearch } = this.props
    let pagination = true
    let blankPage = null
    let notFull = false
    if (movies.length > 0 && movies.length < 20) {
      notFull = true
    }
    if ((!wordForSearch || wordForSearch === 'noword') && movies.length === 0) {
      blankPage = <div className="film__nofilm">Type something to find movies</div>
    } else if (wordForSearch && wordForSearch !== 'noword' && movies[0] === 'nodata') {
      blankPage = <div className="film__nofilm">NO RESULTS</div>
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
          error ? errorFilm : <Film movie={movies[0]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[1]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[2]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[3]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[4]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[5]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[6]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[7]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[8]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[9]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[10]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[11]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[12]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[13]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[14]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[15]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[16]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[17]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[18]} word={wordForSearch} notFull={notFull} />,
          error ? errorFilm : <Film movie={movies[19]} word={wordForSearch} notFull={notFull} />,
        ]}
        {pagination && (
          <Pagination
            className="filmList__pagination"
            defaultCurrent={1}
            onChange={(num) => {
              this.setState({
                num,
              })
            }}
            pageSize={20}
            showSizeChanger={false}
            total={100}
          />
        )}
      </div>
    )
  }
}
