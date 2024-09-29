import React, { useState } from 'react'
import { MyReduserContext } from '../redux/reducer';
import './pageStyles.css';
import PaginationFavorites from '../components/PaginationFavorites';


export default function Favorites() {
  const {state} = React.useContext<any>(MyReduserContext);
  const [str, setStr]=useState<string>('');
  const [sidebar, setSidebar]=useState<string[]>();
  const [rating, setRating]=useState<string[]>();
  const [ratingSearch, setRatingSearch]=useState<string[]>();
  const [search, setSearch]=useState<[]>([])
  const data =state.auth?.favorites;
  const arrSidebar =['Genre','Country','Director','Actors','Year','imdbRating','All']
  const arrRating = [
    {id:9,sign:'<', num:'9.0'},
    {id:1,sign:'<', num:'8.0'},
    {id:2,sign:'<', num:'7.0'},
    {id:3,sign:'<', num:'6.0'},
    {id:4,sign:'<', num:'5.0'},
    {id:5,sign:'<', num:'4.0'},
    {id:6,sign:'<', num:'3.0'},
    {id:7,sign:'<', num:'2.0'},
    {id:8,sign:'<', num:'1.0'},  
  ] 
  const funcSudebar=(item:string)=>{
    if(item==='All'){
      setSearch(data)
    }else if(item==='imdbRating'){
      setStr(item)
      let str =''
      for(let i=0; i<data.length;i++){
        str = str +','+ data[i][item]
      } 
      const result: string[] = str.split(',')
      const arr = result.map((i)=>i.trim()).filter((el)=>el!=='').sort((a,b)=>a<b ? 1 : -1)

      let res: string[] = []
      for(let i of arr){
        if(!res.includes(i)){
            res.push(i)
        }  
      }     
      setSidebar([])
      setRating(res);
    }else{
      setStr(item)
      let str =''
      for(let i=0; i<data.length;i++){
        str = str +','+ data[i][item]
      } 
      const result: string[] = str.split(',')
      const arr = result.map((i)=>i.trim()).filter((el)=>el!=='').sort((a,b)=>a>b ? 1 : -1)

      let res: string[] = []
      for(let i of arr){
        if(!res.includes(i)){
            res.push(i)
        }  
      }
      setSidebar(res);
      setRating([]);
    }
    
  }

  const funcSearch=(item:any)=>{
    const regex = new RegExp(item.trim());
    const arr:[] = data.filter((i:any)=>regex.test(i[str])).sort((a:any,b:any)=>a.Title>b.Title? 1 : -1)
    console.log(arr);
    setSearch(arr)
    setRatingSearch([])
  }
  const funcSearchRating=(item:any)=>{
    console.log(item);
    const arr = data?.filter((i:any)=>parseInt(i.imdbRating)===item)
    console.log(arr);
    setRatingSearch(arr)
    setSearch([])
  }




  return (
    <div className='favorites'>
       { 
        sidebar?.length 
        ?
        <div className="sidebar">
          {
           sidebar?.map((item, index)=> 
           <button
          key={`key${index}`}
           type='button'
           onClick={()=>{funcSearch(item)}}
           >{item}
           </button>
           )}
        </div>
        :
       
        rating
        ? 
        <div className="sidebar">
          {
          arrRating?.map((item)=>
            <button
            type='button'
            key={item.id} 
            onClick={()=>funcSearchRating(parseInt(item.num))}
          >{item.sign}{item.num}</button>
          )
         
          }
        </div>
        :null
        }
        
        <div >
          {  
          data===undefined 
          ?
          <h3>неопходима авторизация</h3>
          :
          data.length === 0 
          ?
          <h3>Вы пока ничего не добавили</h3>
          :
         <>
         <div className='favorites-sort'>
              {
              arrSidebar?.map((item:any, index)=>
               <button
               key={`key${index}`}
               type='button'
               onClick={()=>{funcSudebar(item)}}
               >{item}
               </button>
            )
              }
          </div>
          <>
              {
                search?.length
                ?
                <PaginationFavorites arr={search}/>
                :
                rating?.length
                ?
                <PaginationFavorites arr={ratingSearch}/>
                :
                <PaginationFavorites arr={data}/>
              }
           </>
          
         </>    
          }
        </div>
    </div>
  )
}
