import React, { useContext, useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = (props) => {
  const [inputIsVaild, setInputIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = (e) => {
    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount
    e.preventDefault()

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setInputIsValid(false)
      return
    }
    props.onAddToCart(enteredAmountNumber)
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        label={'Amount'}
        ref={amountInputRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          defaultValue: '1',
          min: '1',
          max: '5'
        }}
      />
      <button>+ Add</button>
      {!inputIsVaild && <p>Enter a valid amount (1-5)</p>}
    </form>
  )
}

export default MealItemForm