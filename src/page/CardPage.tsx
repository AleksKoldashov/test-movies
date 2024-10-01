import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useGetMoviesIdQuery } from '../service/movies';
import { MyReduserContext } from '../redux/reducer';
import './pageStyles.css';
import Loading from '../UI/Loading';
import MyModal from '../UI/MyModal';
import TogelLogin from '../components/TogelLogin';
import FormAuth from '../UI/FormAuth';
import FormReg from '../UI/FormReg';

export default function CardPage() {
    const idmovie = useParams();
    const {state,dispatch} = React.useContext<any>(MyReduserContext);
    const modal = MyModal({title:<TogelLogin/>, content: state.togelLogin ? <FormAuth/>: <FormReg/>});
    const id = idmovie.idmovies;
    const {data, error, isLoading}=useGetMoviesIdQuery(id);
    const favorites =state.auth?.favorites;
 
    const matchChecking=()=>{
        const value = favorites?.some((item:any)=>item.imdbID===id)
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
      modal.togleModal(true)
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
    <NavLink to={'/home'}>&lt; Back</NavLink>
    <h1>{data.Title}</h1>
    <div className='wrapper-card'>
      <img src={data.Poster} alt="" />
      <div>
        <h5>Genre: {data.Genre}</h5>
        <h5>Country: {data.Country}</h5>
        <h5>Director: {data.Director}</h5>
        <h5>Actors: {data.Actors}</h5>
        <h5>Year: {data.Year}</h5>
        <h5>imdbRating: {data.imdbRating}</h5>
      </div>
      
    </div>
    {
      matchChecking() ? 
      <button
        className='red'
        onClick={(e)=>{validReg(e)}}
        >Delete Favorites
      </button>
      :
      <button
      className='gold'
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
