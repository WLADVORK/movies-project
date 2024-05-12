import React from 'react'
import './app.css'

import FilmList from '../film-list'
import Header from '../header'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wordForSearch: 'noword',
    }
  }

  changeValue = ({ target }) => {
    this.setState({
      wordForSearch: target.value,
    })
  }

  render() {
    const { wordForSearch } = this.state
    return (
      <>
        <Header onSearch={this.changeValue} />
        <FilmList wordForSearch={wordForSearch} />
      </>
    )
  }
}
