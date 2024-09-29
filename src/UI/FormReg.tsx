import React from 'react';
import MyInput from './MyInput';
import MyMessager from './MyMessager';
import { MyReduserContext } from '../redux/reducer';
export interface iServer {
  name:string | number;
  password: string | number;
  id: any;
  favorites: any [];
}

export interface iMyInput{
    input: ()=>JSX.Element;
    value: string;
 }

export default function FormReg() {
  const {dispatch} = React.useContext<any>(MyReduserContext);
  const server: iServer [] = JSON.parse(localStorage.getItem('server')as string) || []

  const user: iMyInput = MyInput({type:'text', placeholder:'Enter name....', name: 'User name', cn:'myinput-auth'});
  const password: iMyInput=MyInput({type:'password', placeholder:'Enter password....', name:'Password', cn:'myinput-auth'});
  const repeatpassword: iMyInput=MyInput({type:'password', placeholder:'Enter repeatpassword....', name:'repeatpassword', cn:'myinput-auth'});
  const arr:any [] = [{id:1, name:user}, {id:2, name: password}, {id:3, name: repeatpassword}]
  const messagerUser = MyMessager({title:'такой пользователь существует!!!', style:{color: 'red'}})
  const messagerPass = MyMessager({title:'Разные пароли!!!', style:{color: 'red'}})
  const messagerSuccess = MyMessager({title:'Успешно!!!', style:{color: 'green'}})
// localStorage.clear()


const Registery =(event:React.FormEvent<HTMLFormElement>) => {
event.preventDefault()
  if(password.value===repeatpassword.value){
    const findUser=server.find((item:any)=>item.name===user.value)
    if(findUser===undefined){
        const id =999+Math.random()*(10000+1-999)
        const findId=server.find((item:any)=>item.id=== Math.floor(id))
        if(findId===undefined){
          localStorage.setItem('server', JSON.stringify([...server,{name:user.value, password: password.value, id: Math.floor(id), favorites: []}]))
          dispatch({type:'auth', payload: {name:user.value, password: password.value, id: Math.floor(id), favorites: []}})
          localStorage.setItem('user', JSON.stringify({name:user.value, password: password.value, id: Math.floor(id), favorites: []}))
          messagerSuccess.setShow(true)
          console.log('Успешно');
        }
    }else{
      messagerUser.setShow(true)
      console.log('такой пользователь существует');
    }
    
  }else{
    messagerPass.setShow(true)
    console.log('error');
  }
  }

  return (
    <>
    {
      messagerUser.show ? messagerUser.renderMessager():null
    }
    {
      messagerPass.show ? messagerPass.renderMessager():null
    }
    {
      messagerSuccess.show ? messagerSuccess.renderMessager():null
    }
    <form 
    className='myform' 
    action=""
    onSubmit={(event)=>{Registery(event)}}
    >
       {
        arr.map((item)=><div key={item.id}>{item.name.input()}</div>)
       }
    <button 
    type="submit"
    >Registery</button> 
    </form>
    </>
    
  )
}
