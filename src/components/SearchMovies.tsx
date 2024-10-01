import React from 'react'
import { MyReduserContext } from '../redux/reducer';
import { useNavigate } from 'react-router-dom';

export default function SearchMovies() {
  const nav = useNavigate()
  const {state, dispatch} = React.useContext<any>(MyReduserContext);  
  const [input, setInput]=React.useState<string>('')
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  
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
    return (
    <>
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
    </>
  )
}
