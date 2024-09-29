import React, { useEffect, useState } from 'react'
import './uiStyles.css'


export default function MyInput({...props}) {
const [value, setValue]=useState<string>('')

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
        required
        minLength={4}
        />
        </div>
       
      )
}
  return {input, value}
}
