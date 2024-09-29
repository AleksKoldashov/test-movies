import React from 'react'
import { MyReduserContext } from '../redux/reducer';

export default function Theme() {
    const {dispatch} = React.useContext<any>(MyReduserContext);
    const time = new Date().getHours()
 React.useEffect(()=>{
    if(time>=20||time<=6){
        dispatch({type:'theme',payload:'dark'})
    }else{
        dispatch({type:'theme',payload:'ligth'})
    }
 },[])

  return (
    <div className='theme'>
        <button type="button"
        onClick={()=>dispatch({type:'theme',payload:'ligth'})}
        >Ligth</button>
        |
        <button type="button"
        onClick={()=>dispatch({type:'theme',payload:'dark'})}
        >Dark</button>
    </div>
  )
}
