import React from 'react';
import useInput from '../hooks/useInput';
import useMessager from '../hooks/useMessager';
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
export interface iArrInput{
  id:number;
  name: iMyInput;
}
export default function FormReg() {
  const {dispatch} = React.useContext<any>(MyReduserContext);
  const server: iServer [] = JSON.parse(localStorage.getItem('server')as string) || []

  const user: iMyInput = useInput({type:'text', placeholder:'Enter name....', name: 'User name', cn:'myinput-auth'});
  const password: iMyInput=useInput({type:'password', placeholder:'Enter password....', name:'Password', cn:'myinput-auth'});
  const repeatpassword: iMyInput=useInput({type:'password', placeholder:'Enter repeatpassword....', name:'repeatpassword', cn:'myinput-auth'});
  const arr:iArrInput [] = [{id:1, name:user}, {id:2, name: password}, {id:3, name: repeatpassword}]
  const messagerUser = useMessager({title:'Such a user exists!!!', style:{color: 'red'}})
  const messagerPass = useMessager({title:'Different passwords!!!', style:{color: 'red'}})
  const messagerSuccess = useMessager({title:'Successfully!!!', style:{color: 'green'}})




const Registery =(event:React.FormEvent<HTMLFormElement>) => {
event.preventDefault()
  if(password.value===repeatpassword.value){
    const findUser=server.find((item:iServer)=>item.name===user.value)
    if(findUser===undefined){
        const id =999+Math.random()*(10000+1-999)
        const findId=server.find((item:iServer)=>item.id=== Math.floor(id))
        if(findId===undefined){
          localStorage.setItem('server', JSON.stringify([...server,{name:user.value, password: password.value, id: Math.floor(id), favorites: []}]))
          dispatch({type:'auth', payload: {name:user.value, password: password.value, id: Math.floor(id), favorites: []}})
          localStorage.setItem('user', JSON.stringify({name:user.value, password: password.value, id: Math.floor(id), favorites: []}))
          messagerSuccess.setShow(true)
        }
    }else{
      messagerUser.setShow(true)
    }
    
  }else{
    messagerPass.setShow(true)
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
