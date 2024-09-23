import React, { useState } from 'react'
import MyInput from './MyInput'
import './uiStyles.css'
import MyModal from './MyModal';
import { MyReduserContext } from '../redux/reducer';

export default function FormAuth() {
  const {state, dispatch} = React.useContext<any>(MyReduserContext);
const modal =MyModal({content: 'Успешно зарегестрировался'})
const user = MyInput({type:'text', placeholder:'Enter name....', name:'User name', CN:'myinput-auth', valid: true});
const password=MyInput({type:'password', placeholder:'Enter password....', name:'Password', CN:'myinput-auth', valid: true})
const [show, setShow]=useState(false)
const Auth=()=>{
  if (user.value.length>3) {
    if (password.value.length>3) {
        setShow(false)
        dispatch({type:'auth', payload: {name:user.value, password: password.value}})
        localStorage.setItem('user', JSON.stringify({name:user.value, password: password.value}))
        modal.togleModal()
    }
  }else{
    setShow(true)
  }
}
const funExit=()=>{
  dispatch({type:'auth', payload: false})
  localStorage.clear()
}


  return (
    <form className='myform' >
      {
       modal.showModal ? modal.modal() : null
      }
     {show ? <label className='error-form'>no registery</label> : null}
       {
        user.input()
       }
       {
        password.input()
       }
       {
        state.auth 
        ?
        <input 
        type="button" 
        value="Exit"
        onClick={()=>{funExit()}}
        />
        :
        <input 
        type="button" 
        value="Registery"
        onClick={()=>{Auth()}}
        />
       }
       
    </form>
  )
}
