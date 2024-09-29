import React from 'react'

export default function MyMessager({...props}) {

    const [show, setShow]=React.useState(false)
   

    const renderMessager=()=>{
        return  <div className='mymessager' {...props}>{props.title}</div>
    }
    React.useEffect(()=>{
        setTimeout(()=>setShow(false),4000)
    },[show])

  return {show, setShow, renderMessager}
}
