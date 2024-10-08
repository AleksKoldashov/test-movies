import React, { useEffect} from 'react';
import './App.css';
import logo from './img/logoMovie.png';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { InitState, MyReduserContext, reducer } from './redux/reducer';
import useModal from './hooks/useModal';
import FormAuth from './UI/FormAuth';
import TogelLogin from './components/TogelLogin';
import FormReg from './UI/FormReg';
import Theme from './components/Theme';
import SearchMovies from './components/SearchMovies';
import Exit from './components/Exit';



function App() {
  const nav = useNavigate()
  const [state, dispatch] = React.useReducer(reducer, InitState);


  const modal=useModal({title:<TogelLogin/>, content: state.togelLogin ? <FormAuth/>: <FormReg/>})

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
              {
                state.auth 
                ?
                <Exit/>
                :
                <button
                type="button"
                onClick={()=>{modal.togleModal(true)}}
                >Login</button>
              }
               
                <NavLink to={`/favorites`}>Favorites</NavLink>
                <NavLink to={`/home`}>Home</NavLink> 
            </div>
        </nav>
        <SearchMovies/>
        </div>
        <Outlet/>
        <footer><h5>product by Aleksey Koldashov</h5></footer>
        </div>
    </MyReduserContext.Provider>
    </>
  );
}

export default App;
