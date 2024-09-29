import React from 'react'
import { NavLink} from 'react-router-dom'
import noimg from '../img/noimg2.png'
import './compStyles.css'



export default function Card({item}:any) {
  return (
    <NavLink to={`/${item.imdbID}`}>
          <div key={item.imdbID} className='card'>
            <img src={item.Poster !== 'N/A' ? item.Poster : noimg} alt='img' />
            {item.Title}
          </div>
    </NavLink>
    
  )
}
