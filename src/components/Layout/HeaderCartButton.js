import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/CartContext'

const HeaderCartButton = (props) => {
  const { showCartHandler, cartItems } = useContext(CartContext)
  const [bump, setBump] = useState(false)
  useEffect(() => {
    setBump(true)
    const identifier = setTimeout(() => {
      setBump(false)
    }, 300)
    return (() => {
      clearTimeout(identifier);
    })
  }, [cartItems]);

  const numOfCartItems = cartItems.reduce((cur, item) => cur + +item.amount, 0)

  const btnClasses = `${classes.button} ${bump ? classes.bump : ''}`
  return (
    <button className={btnClasses} onClick={showCartHandler}>
      <span className={classes.icon}> <CartIcon /></span>
      <span >Your Cart</span>
      <span className={classes.badge} >{numOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton