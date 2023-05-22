import { useState, useContext } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import CartContext from '../../store/CartContext'


const Cart = props => {
  const cartCtx = useContext(CartContext)

  const cartItems = cartCtx.cartItems

  const hasItems = cartItems.length > 0

  const removeHandler = (id) => {
    cartCtx.decreaseItem(id)

  }

  const addHandler = (id) => {
    cartCtx.increaseItem(id)
  }

  return (
    <Modal hideHandler={cartCtx.hideCartHandler}>
      <ul className={classes['cart-items']}>
        {cartItems.map(meal => {
          return <CartItem
            key={meal.id}
            name={meal.name}
            price={meal.price}
            amount={meal.amount}
            onRemove={() => removeHandler(meal.id)}
            onAdd={() => addHandler(meal.id)}
          />
        })}
      </ul>
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{cartCtx.totalPrice}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={cartCtx.hideCartHandler}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}




export default Cart