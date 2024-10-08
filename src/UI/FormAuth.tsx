import React from 'react';
import useInput from '../hooks/useInput';
import './uiStyles.css';
import { MyReduserContext } from '../redux/reducer';
import useMessager from '../hooks/useMessager';
import { iArrInput, iMyInput } from './FormReg';

export default function FormAuth() {
const {state, dispatch} = React.useContext<any>(MyReduserContext);
console.log(state);


const user:iMyInput = useInput({type:'text', placeholder:'Enter name....', name:'User name', cn:'myinput-auth'});
const password:iMyInput=useInput({type:'password', placeholder:'Enter password....', name:'Password', cn:'myinput-auth'});
const messagerSuccess = useMessager({title:'Успешно!!!', style:{color: 'green'}})
const messagerError = useMessager({title:'Неверный пароль или имя пользователя', style:{color: 'red'}})
const arr:iArrInput [] = [{id: 1, name: user},{id:2, name: password}];

const Auth=(event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
  const valid1 = state.server?.find((item:any)=>item.name===user.value)
  if(valid1?.password===password?.value){
    console.log(valid1);
    dispatch({type:'auth', payload: valid1})
    localStorage.setItem('user', JSON.stringify(valid1))
    messagerSuccess.setShow(true)
    console.log('success');
  }else{
    messagerError.setShow(true)
    console.log('неверный пароль');
  }  
}
React.useEffect(()=>{
setTimeout(()=>messagerSuccess.setShow(false),1000)
setTimeout(()=>messagerError.setShow(false),10000)
},[messagerSuccess.show,messagerError.show])
  return (
    <>
    {
      messagerSuccess.show ? messagerSuccess.renderMessager() : null
    }
     {
      messagerError.show ? messagerError.renderMessager() : null
    }
    <form 
    className='myform' 
    onSubmit={(event)=>{Auth(event)}}
    >
        {
        arr.map((item:iArrInput)=> <div key={item.id}>{item.name.input()}</div>)}
        <button 
        type="submit"
        >Login</button>
    </form>
    </>
    
  )
}
