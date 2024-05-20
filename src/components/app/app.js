import React from 'react'
import './app.css'
import { Tabs } from 'antd'

import FilmList from '../film-list'
import Header from '../header'
import createGuestSession from '../../service/create-guest-session/create-guest-session'
import RatedList from '../rated-list'
import getGenres from '../../service/get-genres/get-genres'
import GenresContext from '../../service/create-context/create-context'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wordForSearch: '',
      sessionId: null,
      genres: null,
    }
  }

  componentDidMount() {
    this.genres()
    createGuestSession().then((res) => {
      this.setState({
        sessionId: res.guest_session_id,
      })
    })
  }

  changeValue = ({ target }) => {
    this.setState({
      wordForSearch: target.value,
    })
  }

  async genres() {
    const genres = await getGenres()
    this.setState({ genres })
  }

  render() {
    const { wordForSearch, sessionId, genres } = this.state
    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <>
            <Header onSearch={this.changeValue} />
            <FilmList wordForSearch={wordForSearch} sessionId={sessionId} />
          </>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: <RatedList sessionId={sessionId} />,
      },
    ]

    return (
      <div className="app">
        <GenresContext.Provider value={genres}>
          <Tabs
            style={{ alignItems: 'center', display: 'flex' }}
            defaultActiveKey="1"
            items={items}
            destroyInactiveTabPane
            onChange={() => {
              this.setState({ wordForSearch: '' })
            }}
          />
        </GenresContext.Provider>
      </div>
    )
  }
}
