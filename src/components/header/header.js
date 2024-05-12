import React from 'react'
import './header.css'
import _ from 'lodash'

export default function Header({ onSearch }) {
  return (
    <header className="header">
      <input placeholder="Type to search..." className="header__search" onChange={_.debounce(onSearch, 2000)} />
    </header>
  )
}
