import React, { useReducer, useEffect, useState } from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalPrice: 0,
  showCart: false,
  showCartHandler: () => { },
  hideCartHandler: () => { },
  addItem: (newItem) => { },
  removeItem: (id) => { }
})


const initialCartState = {
  items: [],
  totalPrice: 0,
};

function cartReducer(state, action) {
  let updatedItems = null, updatedTotalPrice = 0, currentItemPrice = 0;
  switch (action.type) {
    case 'ADD':
      updatedTotalPrice = state.totalPrice + +(action.item.price) * +(action.item.amount)
      // check if the item already exists or no. It will work if the item doesn't exist
      if (!state.items.some(cartItem => cartItem.id === action.item.id)) {
        updatedItems = state.items.concat(action.item)
        return { items: updatedItems, totalPrice: +updatedTotalPrice.toFixed(2) };
      }
      // if it does exist:
      updatedItems = state.items.map(cartItem => {
        if (cartItem.id !== action.item.id) return cartItem;
        return {
          ...cartItem,
          amount: +cartItem.amount + +action.item.amount,
        };
      });
      return { items: updatedItems, totalPrice: updatedTotalPrice };

    case 'INCREASE':
      updatedItems = state.items.map(item => {
        if (item.id !== action.id) return item;
        currentItemPrice = +(item.price)
        return {
          ...item,
          amount: item.amount + 1
        };
      })
      updatedTotalPrice = state.totalPrice + currentItemPrice

      return { items: updatedItems, totalPrice: +updatedTotalPrice.toFixed(2) };

    case 'DECREASE':
      updatedItems = state.items.map(item => {
        if (item.id !== action.id) return item;
        currentItemPrice = +(item.price)
        if (item.amount === 1) return null
        return {
          ...item,
          amount: item.amount - 1
        };
      }).filter(Boolean);
      updatedTotalPrice = state.totalPrice - currentItemPrice
      return { items: updatedItems, totalPrice: +updatedTotalPrice.toFixed(2) };
    default:
      throw new Error('wrong case');
  }
}


export const CartContextProvider = (props) => {
  const [cartItemsState, cartItemsDispatch] = useReducer(cartReducer, initialCartState)
  const [totalPrice, setTotalPrice] = useState(0)
  const [showCart, setShowCart] = useState(false)

  const showCartHandler = () => {
    console.log('show cart ')
    setShowCart(true)
  }

  const hideCartHandler = () => {
    console.log('hide cart ')
    setShowCart(false)
  }

  const addItemToCartHandler = (newItem) => {
    cartItemsDispatch({ type: 'ADD', item: newItem })
  }

  const increaseItem = id => {
    cartItemsDispatch({ type: 'INCREASE', id: id })
  }

  const decreaseItem = id => {
    cartItemsDispatch({ type: 'DECREASE', id: id })

  }

  useEffect(() => {
    setTotalPrice(cartItemsState.items.reduce((cur, item) => cur + (item.price * item.amount), 0))

  }, [cartItemsState.items])

  const cartContextValues = {
    cartItems: cartItemsState.items,
    showCart,
    totalPrice: cartItemsState.totalPrice,
    addItem: addItemToCartHandler,
    showCartHandler,
    hideCartHandler,
    decreaseItem,
    increaseItem
  }

  return (
    <CartContext.Provider value={cartContextValues}>
      {props.children}
    </CartContext.Provider >
  )
}

export default CartContext;