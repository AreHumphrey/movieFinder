import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="header-bar">
      <div className="header-container">
      <Link to="/" className="header-logo">MovieFinder</Link>

      </div>
    </header>
  )
}

export default Header
export {}
