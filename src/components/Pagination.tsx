import React from 'react'
import { MyReduserContext } from '../redux/reducer';

export default function Pagination() {
const {state, dispatch} = React.useContext<any>(MyReduserContext);

function handelDecriment() {
    if(state.pagination>1){
        dispatch({type:'pagination', payload:state.pagination-1})
    }
}
  return (
    <div className="pagination">
          <button
          type='button'
          onClick={()=>{handelDecriment()}}
          >&lt;</button>
          <div>{state.pagination}</div>
          <button
          type='button'
          onClick={()=>{dispatch({type:'pagination', payload:state.pagination+1})}}
          >&gt;</button>
        </div>
  )
}
