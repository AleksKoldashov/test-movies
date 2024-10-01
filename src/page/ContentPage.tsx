import React, { Suspense, useState } from 'react';
import { useGetMoviesQuery } from '../service/movies';
import Loading from '../UI/Loading';
// import Card from '../components/Card';
import { MyReduserContext } from '../redux/reducer';
import Pagination from '../components/Pagination';
interface iData{
  Search: iDataArray10 [];
  totalResults:string;
  Response: string;
}

interface iDataArray10{
  Poster:string;
  Title:string;
  Type:string;
  Year:string;
  imdbID:string;
}

export default function ContentPage() {
    const {state, dispatch} = React.useContext<any>(MyReduserContext);
    
    const str = state.valueSearch;
    const pagin = state.pagination;
    const [movType, setMovType]=useState('movie');
    const {data, error, isLoading}=useGetMoviesQuery({str,pagin, movType});

    const arrGenres=[{id:1, name: 'movie'}, {id:2,name: 'series'},{id:3,name:'episode'}]
    const Card = React.lazy(()=> import('../components/Card'))
   console.log(data);
   
    const handelType: any=(item:any)=>{
      dispatch({type:'pagination', payload: 1})
      setMovType(item)
    }



  return (
    <div className='content'>
       <div className="genres">
        {
          arrGenres.map((item, index)=><button 
          type='button'
          key={item.id}
          onClick={()=>{handelType(item)}}
          >{item.name}
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
        data?.Search.map((item:iDataArray10, index:number)=>
          <Suspense fallback={<Loading/>}>
            <Card item={item} key={item.imdbID}/>
          </Suspense>
      )
        :
        <h1>По Вашему запросу ничего не найдено</h1>
       
          }
      
        </div>
        <Pagination/>
    </div>
  )
}
