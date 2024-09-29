import React, { useId, useState } from 'react';
import MyInput from './MyInput';
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
  const server: iServer [] = JSON.parse(localStorage.getItem('server')as string) || []

  const user: iMyInput = MyInput({type:'text', placeholder:'Enter name....', name: 'User name', CN:'myinput-auth'});
  const password: iMyInput=MyInput({type:'password', placeholder:'Enter password....', name:'Password', CN:'myinput-auth'});
  const repeatpassword: iMyInput=MyInput({type:'password', placeholder:'Enter repeatpassword....', name:'repeatpassword', CN:'myinput-auth'});
  const arr: iMyInput [] = [user, password, repeatpassword]
  
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
        }
    }else{
      console.log('такой пользователь существует');
    }
    
  }else{
    console.log('error');
  }

  }


  return (
    <form 
    className='myform' 
    action=""
    onSubmit={(event)=>{Registery(event)}}
    >
       {
        arr.map((item)=>item.input())
       }
    <button 
    type="submit"
    >Registery</button> 
    </form>
  )
}
