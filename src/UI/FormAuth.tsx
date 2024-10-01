import React from 'react';
import MyInput from './MyInput';
import './uiStyles.css';
import { MyReduserContext } from '../redux/reducer';
import MyMessager from './MyMessager';
import { iArrInput, iMyInput } from './FormReg';


export default function FormAuth() {
const {state, dispatch} = React.useContext<any>(MyReduserContext);

const user:iMyInput = MyInput({type:'text', placeholder:'Enter name....', name:'User name', cn:'myinput-auth'});
const password:iMyInput=MyInput({type:'password', placeholder:'Enter password....', name:'Password', cn:'myinput-auth'});
const messagerSuccess = MyMessager({title:'Успешно!!!', style:{color: 'green'}})
const messagerError = MyMessager({title:'Неверный пароль или имя пользователя', style:{color: 'red'}})
const arr:iArrInput [] = [{id: 1, name: user},{id:2, name: password}];

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
  if(valid1?.password===password?.value){
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
       {
        !!state.auth 
        ?
        <button 
        type="submit"
        onClick={()=>{Exit()}}
        >Exit</button>
        :
        <button 
        type="submit"
        >Login</button>
       }
       
    </form>
    </>
    
  )
}
