import React from 'react'

const HamburgerButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={`${process.env.PUBLIC_URL}/img/menu.svg`} alt="메뉴" />
    </button>
  )
}

export default HamburgerButton
