import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'



const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick} />
  );
}

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      {props.children}
    </div>

  )
}

const portalElemnt = document.getElementById('overlays')

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.hideHandler} />, portalElemnt)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElemnt)}
    </Fragment>
  )
}

export default Modal