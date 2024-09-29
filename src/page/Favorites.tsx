import React, { useState } from 'react'
import { MyReduserContext } from '../redux/reducer';
import Card from '../components/Card';
import './pageStyles.css';
import PaginationFavorites from '../components/PaginationFavorites';


export default function Favorites() {
  const {state} = React.useContext<any>(MyReduserContext);
  const [str, setStr]=useState<string>('')
  const [sidebar, setSidebar]=useState<string[]>()
  const [search, setSearch]=useState<[]>([])
  const data =state.auth?.favorites;
  const arrSidebar =['Genre','Country','Director','Actors','Year','imdbRating','All']

  const funcSudebar=(item:string)=>{
    if(item==='All'){
      setSearch([])
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
    }
    
  }

  const funcSearch=(item:any)=>{
    const regex = new RegExp(item.trim());
    const arr:[] = data.filter((i:any)=>regex.test(i[str])).sort((a:any,b:any)=>a.Title>b.Title? 1 : -1)
    console.log(arr);
    setSearch(arr)
  }


  return (
    <div className='favorites'>
       { 
        sidebar?.length ?
        <div className="sidebar">
          {
           sidebar?.map((item)=>
           <button
           onClick={()=>{funcSearch(item)}}
           >{item}
           </button>)
          }
        </div>
        :null
        }
        <div >
          {  
          data==undefined 
          ?
          <h3>неопходима авторизация</h3>
          :
          data.length == 0 
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
                <PaginationFavorites arr={data}/>
              }
           </>
          
         </>    
          }
        </div>
    </div>
  )
}
