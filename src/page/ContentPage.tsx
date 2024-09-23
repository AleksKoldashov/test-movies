import React, { useState } from 'react';
import { useGetMoviesQuery } from '../service/movies';
import Loading from '../UI/Loading';
import Card from '../components/Card';
import { MyReduserContext } from '../redux/reducer';
import Pagination from '../components/Pagination';


export default function ContentPage() {
    const {state, dispatch} = React.useContext<any>(MyReduserContext);
    const str = state.valueSearch;
    const pagin = state.pagination;
    const [movType, setMovType]=useState('movie');

 
    const {data, error, isLoading}=useGetMoviesQuery({str,pagin, movType});

    const arrGenres=['movie', 'series','episode']

   
    const handelType: any=(item:any)=>{
      dispatch({type:'pagination', payload: 1})
      setMovType(item)
    }



  return (
    <div className='content'>
       <div className="genres">
        {
          arrGenres.map((item, index)=><button 
          key={index}
          onClick={()=>{handelType(item)}}
          >{item}
          </button>
          )
        }
        </div> 
        {/* <h4>по вашему запросу нашлось: {data?.totalResults}</h4> */}
        <div className="cards"> 
        {
        isLoading 
        ? 
        <Loading/>
        :
        error 
        ?
        <p>error</p>
        :
        !data.Error
        ? 
        data?.Search.map((item:any, index:number)=><Card item={item} key={index}/>)
        : 
        <h1>По Вашему запросу ничего не найдено</h1> 
          }
      
        </div>
        <Pagination/>
    </div>
  )
}
