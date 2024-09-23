import React from 'react'
import { useParams } from 'react-router-dom';
// import { useGetMoviesIdQuery } from '../service/movies';
import { MyReduserContext } from '../redux/reducer';
import './pageStyles.css';
// import Loading from '../UI/Loading';

export default function CardPage() {
    const idmovie = useParams();
    const {state} = React.useContext<any>(MyReduserContext);
    const id = idmovie.idmovies;
    // const {data, error, isLoading}=useGetMoviesIdQuery(id);
    const favorites =state.favorites;
    console.log(id);
    console.log(favorites);
    
    // const matchChecking=()=>{
    //     const value = favorites.some((item:any)=>item.imdbID===id)
    //     return value
    // }
    // const deleteFavorites=(arr:any, data:any)=>{
    //     const newArr=arr.filter((item:any)=>item.imdbID!==data.imdbID)
    //     return newArr
    // }
  return (
    <div>Работатет</div>
    // isLoading 
    // ? 
    // <Loading/>
    // :
    // error
    // ?
    // <p>error</p>
    // :
    // data && <div className='card-page'>
    // <h1>{data.Title}</h1>
    // <img src={data.Poster} alt="" />
    // {
    //   matchChecking() ? 
    //   <button
    //     onClick={()=>{dispatch({type:'updateFavorites',payload: deleteFavorites(favorites, data)})}}
    //     >Delete Favorites
    //   </button>
    //   :
    //   <button
    //   onClick={()=>{dispatch({type:'addFavorites',payload: data})}}
    //   >Add Favorites
    //   </button>
    // }
    
    // </div>

    
   
  )
}
