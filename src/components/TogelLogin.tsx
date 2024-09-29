import React from 'react'
import { MyReduserContext } from '../redux/reducer';

export default function TogelLogin() {
const {state, dispatch} = React.useContext<any>(MyReduserContext);

return (
    <>
    <button type="button"
    onClick={()=>{dispatch({type: "togelLogin", payload: true})}}
    >Authorization</button>
    |
    <button type="button"
    onClick={()=>{dispatch({type: "togelLogin", payload: false})}}
    >Registration</button>
    </>
  )
}
