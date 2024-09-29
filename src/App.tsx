import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './img/logoMovie.png';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { InitState, MyReduserContext, reducer } from './redux/reducer';
import MyModal from './UI/MyModal';
import FormAuth from './UI/FormAuth';
import { ThemeContext } from '.';
import TogelLogin from './components/TogelLogin';
import FormReg from './UI/FormReg';

function App() {
  const nav = useNavigate()
  
  const theme2 = React.useContext(ThemeContext);

  
  const [state, dispatch] = React.useReducer(reducer, InitState);
  const [theme, setTheme]=useState('dark')
  const [input, setInput]=useState<string>('')
  const modal=MyModal({title:<TogelLogin/>, content: state.togelLogin ? <FormAuth/>: <FormReg/>})


const handelValue:React.ChangeEventHandler<HTMLInputElement> =(e)=>{
    setInput(e.target.value)
}
function handelClick(){
  dispatch({type:'pagination', payload: 1})
  dispatch({type:'updateStr', payload: input})
  setInput('')
}

useEffect(()=>{
  nav('/home')
},[nav])

  return (
    <MyReduserContext.Provider  value={{dispatch, state}}>
    {
       modal.showModal ? modal.modal() : null
    }
    <div className={theme}>
        <div className={`header-${theme}`}>
        <header>
          <NavLink to={'/home'}><img src={logo} alt="logo" /></NavLink>
          <h3>Movies Info</h3>
        </header>
        <nav>
            <div>
                <div className='theme'>
                <button type="button"
                onClick={()=>setTheme('ligth')}
                >Ligth</button>
                |
                <button type="button"
                onClick={()=>setTheme('dark')}
                >Dark</button>
              </div>
            </div>
            <div>
              {!!state.auth ?  <div className='avatar'>{state?.auth.name}</div> : null}
                <button
                type="button"
                onClick={()=>{modal.togleModal()}}
                >{!!state.auth ?  "Exit" : "Login"}</button>
                <NavLink to={`/favorites`}>Favorites</NavLink>
                <NavLink to={`/home`}>Home</NavLink> 
            </div>
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
        <footer><h5>product by Aleksey Koldashov</h5></footer>
        </div>
    </MyReduserContext.Provider>
   
  );
}

export default App;
