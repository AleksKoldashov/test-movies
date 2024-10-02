import React from 'react'
import { MyReduserContext } from '../redux/reducer';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';

export default function SearchMovies() {
  const nav = useNavigate()
  const {dispatch} = React.useContext<any>(MyReduserContext); 
  const inputSearch=useInput({placeholder:'enter movie title....',type:"text",className:'my-input'}) 

function handelClick(){
    nav('/home')
    dispatch({type:'pagination', payload: 1})
    dispatch({type:'updateStr', payload: inputSearch.value})
    inputSearch.setValue("")
  }

    return (
    <>
     <div className="search">
              {
                inputSearch.input()
              }
              <button 
              type="button"
              onClick={()=>{handelClick()}}
              >Seach</button>
        </div>
    </>
  )
}
