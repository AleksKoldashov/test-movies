import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetMoviesIdQuery } from '../service/movies';
import { MyReduserContext } from '../redux/reducer';
import './pageStyles.css';
import Loading from '../UI/Loading';
import MyModal from '../UI/MyModal';

export default function CardPage() {
    const idmovie = useParams();
    const modal = MyModal({content:'надо зарегестрироваться!!!'});
    const {state,dispatch} = React.useContext<any>(MyReduserContext);
    const id = idmovie.idmovies;
    const {data, error, isLoading}=useGetMoviesIdQuery(id);
    const favorites =state.favorites;

    
    const matchChecking=()=>{
        const value = favorites.some((item:any)=>item.imdbID===id)
        return value
    }
    const deleteFavorites=(arr:any, data:any)=>{
        const newArr=arr.filter((item:any)=>item.imdbID!==data.imdbID)
        return newArr
    }
    const validReg: React.MouseEventHandler<HTMLButtonElement> =(e)=>{
      state.auth 
      ?
          e.currentTarget.innerText === 'Delete Favorites' 
          ?
              dispatch({type:'updateFavorites',payload: deleteFavorites(favorites, data)})
          :
              dispatch({type:'addFavorites',payload: data})
      :
      modal.togleModal()
    }
  return (
    isLoading 
    ? 
    <Loading/>
    :
    error
    ?
    <p>error</p>
    :
    data && <div className='card-page'>
    <h1>{data.Title}</h1>
    <img src={data.Poster} alt="" />
    {
      matchChecking() ? 
      <button
        onClick={(e)=>{validReg(e)}}
        >Delete Favorites
      </button>
      :
      <button
      onClick={(e)=>{validReg(e)}}
      >Add Favorites
      </button>
  
    }
    {
      modal.showModal ?  modal.modal() :null
    }
    </div>
  )
}
