import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} MovieFinder. Все права защищены.</p>
      </div>
    </footer>
  )
}

export default Footer