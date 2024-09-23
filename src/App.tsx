import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './img/logoMovie.png'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { InitState, MyReduserContext, reducer } from './redux/reducer';
import MyModal from './UI/MyModal';
import FormAuth from './UI/FormAuth';

function App() {
  const nav = useNavigate()
  const modal=MyModal({title:'Авторизация', content: <FormAuth/>})
  const [state, dispatch] = React.useReducer(reducer, InitState);
  const [theme, setTheme]=useState('dark')
  const [input, setInput]=useState<string>('')
  
const handelValue:React.ChangeEventHandler<HTMLInputElement> =(e)=>{
    setInput(e.target.value)
}
function handelClick(){
  nav('/home')
  dispatch({type:'pagination', payload: 1})
  dispatch({type:'updateStr', payload: input})
  setInput('')
}

useEffect(()=>{
  nav('/home')
},[])

  return (
    <MyReduserContext.Provider  value={{dispatch, state}}>
    {
       modal.showModal ? modal.modal() : null
    }
    <div className={theme}>
        <div className={`header-${theme}`}>
        <header>
          <img src={logo} alt="logo" />
          <h3>Movies Info</h3>
        </header>
        <nav>
              <button
              onClick={()=>{modal.togleModal()}}
              >Auth</button>
              <NavLink to={`/favorites`}>Favorites</NavLink>
              <NavLink to={`/home`}>Home</NavLink> 
        </nav>
        <div className="search">
              <input type="text" placeholder='enter movie title....' className='my-input' onChange={handelValue} value={input}/>
              <button 
              type="button"
              onClick={()=>{handelClick()}}
              >Seach</button>
        </div>
        </div>
        <Outlet/>
        
        
        <div className='theme'>
          <button type="button"
          onClick={()=>setTheme('ligth')}
          >Ligth</button>
          |
          <button type="button"
          onClick={()=>setTheme('dark')}
          >Dark</button>
        </div>
        <footer>footer</footer>
        </div>
    </MyReduserContext.Provider>
   
  );
}

export default App;
