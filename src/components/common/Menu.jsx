import React from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/man'>List</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
