import React from 'react'
import { MyReduserContext } from '../redux/reducer';
import Card from '../components/Card';
import './pageStyles.css';

export default function Favorites() {
  const {state} = React.useContext<any>(MyReduserContext);
  const data =state.favorites;

  return (
    <div className='favorites'>
        <div className='cards'>
          {  
          data.length === 0 ?
          <h3>Вы пока ничего не добавили</h3>
          :
          data.map((item:any)=><Card item={item}/>)
          }
        </div>
    </div>
  )
}
