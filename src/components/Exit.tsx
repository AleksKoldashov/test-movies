import React from 'react'
import { MyReduserContext } from '../redux/reducer';

export default function Exit() {
    const {state, dispatch} = React.useContext<any>(MyReduserContext);
    const funExit=()=>{
        const server =JSON.parse(localStorage.getItem("server")as string);
        const newArr = server.filter((item:any)=>item.id!==state.auth.id);
        localStorage.setItem("server", JSON.stringify([...newArr, state.auth]));
        dispatch({type:'auth', payload: false});
        localStorage.setItem('user', JSON.stringify(false));
    }
    
  return (
    <button 
    type="submit"
    onClick={()=>{funExit()}}
    >Exit
    </button>
  )
}
