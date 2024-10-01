import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './img/logoMovie.png';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { InitState, MyReduserContext, reducer } from './redux/reducer';
import MyModal from './UI/MyModal';
import FormAuth from './UI/FormAuth';
import TogelLogin from './components/TogelLogin';
import FormReg from './UI/FormReg';
import Theme from './components/Theme';


function App() {
  const nav = useNavigate()
  const [state, dispatch] = React.useReducer(reducer, InitState);

  const [input, setInput]=useState<string>('')
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const modal=MyModal({title:<TogelLogin/>, content: state.togelLogin ? <FormAuth/>: <FormReg/>})

const handelValue:React.ChangeEventHandler<HTMLInputElement> =(e)=>{
    setInput(e.target.value)
}


function handelClick(){
  nav('/home')
  dispatch({type:'pagination', payload: 1})
  dispatch({type:'updateStr', payload: debouncedInputValue})
  setInput('')
}

React.useEffect(() => {
  const timeoutId = setTimeout(() => {
    setDebouncedInputValue(input);
  }, 500);
  return () => clearTimeout(timeoutId);
}, [input, 1000]);

useEffect(()=>{
  nav('/home')
},[nav])

useEffect(()=>{
  setTimeout(()=>
    state.auth
    ? 
    modal.togleModal(false)
    :
    null
  ,1500)
},[state.auth])


  return (
    <>
    <MyReduserContext.Provider  value={{dispatch, state}}>
    {
       modal.showModal ? modal.modal() : null
    }
    <div className={state.theme}>
        <div className={`header-${state.theme}`}>
        <header>
          <NavLink to={'/home'}><img src={logo} alt="logo" /></NavLink>
          <h3>Movies Info</h3>
        </header>
        <nav>
            <div>
              <Theme/>
            </div>
            <div>
              {!!state.auth ?  <div className='avatar'>{state?.auth.name}</div> : null}
                <button
                type="button"
                onClick={()=>{modal.togleModal(true)}}
                >{!!state.auth ?  "Exit" : "Login"}</button>
                <NavLink to={`/favorites`}>Favorites</NavLink>
                <NavLink to={`/home`}>Home</NavLink> 
            </div>
        </nav>
        <div className="search">
              <input 
              type="text" 
              placeholder='enter movie title....' 
              className='my-input' 
              onChange={handelValue}
              value={input}
              />
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
    </>
  );
}

export default App;
