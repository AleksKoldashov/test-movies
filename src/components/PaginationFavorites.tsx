import React from 'react'
import Card from './Card';

export default function PaginationFavorites({...arr}) {
    const [pagin, setPagin]=React.useState<any>({page:1, left:0, rigth:6})
console.log(arr.arr);

    const newArr=arr.arr?.slice(pagin.left,pagin.rigth)
    let length = arr.arr?.length as number
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
  return (
    <>
    <div className='favorites-cards'>
    {
        newArr?.map((item:any)=><Card item={item}/>)
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

