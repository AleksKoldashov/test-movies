import React, { useEffect, useState } from 'react'
import './uiStyles.css'

export default function MyInput({...props}) {
const [value, setValue]=useState<string>('')

const feildValueError=(val:string)=>{
  if (val.length<3) {
    return <div className='info-input'>мало символов</div>
  }
}
const handelValue:React.ChangeEventHandler<HTMLInputElement> =(e)=>{
    setValue(e.target.value)
}
useEffect(()=>{
  setValue('')
},[])
const input=()=>{
    return (
        <div className={props.CN}>
        <label>{props.name}</label>
         <input 
        {...props}
        value={value} 
        onChange={handelValue} 
        />
        {
          props.valid ? feildValueError(value) : null
        }
        </div>
       
      )
}
  return {input, value}
}
