import React, { useState } from 'react'
import MyInput from './MyInput'
import './uiStyles.css'

export default function FormAuth() {

const user = MyInput({type:'text', placeholder:'Enter name....', name:'User name', CN:'myinput-auth', valid: true});
const password=MyInput({type:'password', placeholder:'Enter password....', name:'Password', CN:'myinput-auth', valid: true})
const [show, setShow]=useState(false)
const Auth=()=>{
  if (user.value.length>3) {
    if (password.value.length>3) {
        setShow(false)
        localStorage.setItem('user', JSON.stringify({name:user.value, password: password.value}))
    }
  }else{
    setShow(true)
  }
}


  return (
    <form className='myform' >
     {show ? <label className='error-form'>no registery</label> : null}
       {
        user.input()
       }
       {
        password.input()
       }
       <input 
       type="button" 
       value="Registery"
       onClick={()=>{Auth()}}
       />
    </form>
  )
}
