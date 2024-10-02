import React, { useEffect, useState } from 'react'
import './uiStyles.css'



export default function MyInput({...props}) {
const [value, setValue]=useState<string>('')
const [debouncedInputValue, setDebouncedInputValue] = React.useState("");

const handelValue:React.ChangeEventHandler<HTMLInputElement> =(e)=>{
    setValue(e.target.value)
}
useEffect(()=>{
  setValue('')
},[])

React.useEffect(() => {
  const timeoutId = setTimeout(() => {
    setDebouncedInputValue(value);
  }, 500);
  return () => clearTimeout(timeoutId);
}, [value, 1000]);

const input=()=>{
    return (
        <div className={props.cn} >
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
  return {input, value: debouncedInputValue, setValue}
}
