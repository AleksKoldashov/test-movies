import React from 'react';
import MyInput from './MyInput';
import './uiStyles.css';

import { MyReduserContext } from '../redux/reducer';


export default function FormAuth() {
const {state, dispatch} = React.useContext<any>(MyReduserContext);

const user:any = MyInput({type:'text', placeholder:'Enter name....', name:'User name', cn:'myinput-auth'});
const password=MyInput({type:'password', placeholder:'Enter password....', name:'Password', cn:'myinput-auth'});


const arr = [{id: 1, name: user},{id:2, name: password}];

const Exit=()=>{

  const server =JSON.parse(localStorage.getItem("server")as string);
  const newArr = server.filter((item:any)=>item.id!==state.auth.id);
  console.log(newArr);
  
  localStorage.setItem("server", JSON.stringify([...newArr, state.auth]));
  dispatch({type:'auth', payload: false});
  localStorage.setItem('user', JSON.stringify(false));

}

const Auth=(event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
  const valid1 = state.server?.find((item:any)=>item.name===user.value)
  if(valid1?.password==password?.value){
    dispatch({type:'auth', payload: valid1})
    localStorage.setItem('user', JSON.stringify(valid1))
    console.log('success');
  }else{
    console.log('неверный пароль');
  }  
}

  return (
    <form 
    className='myform' 
    onClick={(event)=>{Auth(event)}}
    >
        {
        arr.map((item:any)=> <div key={item.id}>{item.name.input()}</div>)}
       {
        !!state.auth 
        ?
        <button 
        type="submit"
        onClick={()=>{Exit()}}
        >Exit</button>
        :
        <button type="submit">Войти</button>
       }
       
    </form>
  )
}
