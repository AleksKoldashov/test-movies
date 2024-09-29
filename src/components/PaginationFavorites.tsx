import React from 'react'
import Card from './Card';

export default function PaginationFavorites({...arr}) {
    const [pagin, setPagin]=React.useState<any>({page:1, left:0, rigth:6})

    const newArr=arr.arr?.slice(pagin.left,pagin.rigth)
    let length = arr.arr?.length as number
    let valid = Math.ceil(length/6)
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
  return (
    <>
    <div className='favorites-cards'>
    {   
        arr.arr?.length>0
        ?
        newArr?.map((item:any)=><Card item={item} key={item.imdbID}/>)
        :
        <h3>нет подходящих фильмов</h3>
    }
    </div>
    <div className="pagination">
          <button
          type='button'
          onClick={()=>{Dicriment()}}
          >&lt;</button>
          <div>{pagin.page}</div>
          <button
          type='button'
          onClick={()=>{Incriment()}}
          >&gt;</button>
    </div>
    </>
    
    
  )
}

