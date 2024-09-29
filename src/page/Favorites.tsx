import React, { useState } from 'react'
import { MyReduserContext } from '../redux/reducer';
import Card from '../components/Card';
import './pageStyles.css';


export default function Favorites() {
  const {state} = React.useContext<any>(MyReduserContext);
  const [str, setStr]=useState<string>('')
  const [sidebar, setSidebar]=useState<string[]>()
  const [search, setSearch]=useState<[]>([])
  const [pagin, setPagin]=useState<any>({page:1, left:0, rigth:6})
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

const Pagination=(arr?:any[])=>{
      const newArr=arr?.slice(pagin.left,pagin.rigth)
      let length = arr?.length as number
      console.log(pagin.page);
      let valid = Math.ceil(length/6)
      console.log(valid);
        const Incriment=()=>{
          if(pagin.page<valid){
            setPagin({page:pagin.page+1, left: pagin.left+6, rigth: pagin.rigth+6})
          }
        } 
        const Dicriment=()=>{
          if(pagin.page>1){
            setPagin({page:pagin.page-1, left: pagin.left-6, rigth: pagin.rigth-6})
          }
          
        }   
       
        return {newArr, Incriment, Dicriment}
      
      
  }
Pagination(data)
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
              arrSidebar?.map((item:any)=>
               <button
               onClick={()=>{funcSudebar(item)}}
               >{item}
               </button>
            )
              }
          </div>
          <div className='favorites-cards'>
              {
                search?.length
                ?
                search?.map((item:any)=><Card item={item}/>)
                :
                Pagination(data).newArr?.map((item:any)=><Card item={item}/>)
              }
            
           </div>
          <div className="pagination">
          <button
          type='button'
          onClick={()=>{Pagination(data).Dicriment()}}
          >&lt;</button>
          <div>{pagin.page}</div>
          <button
          type='button'
          onClick={()=>{Pagination(data).Incriment()}}
          >&gt;</button>
          </div>
         </>    
          }
        </div>
    </div>
  )
}
