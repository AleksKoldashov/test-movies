import React from 'react'
import './uiStyles.css'

export default function MyModal({...props}) {
const [showModal, setShowModal]=React.useState(false)

const modal=()=>{
    return (
        <>
        <div className='modal'>
            <header>
                <h5>{props.title}</h5>
                <button
                onClick={()=>{setShowModal(false)}}
                >&#10006;</button>
            </header>
            {
                props.content
            }
            <footer></footer>
        </div>
        <div className='opcy'></div>

        </>
      )
}
const togleModal=()=>{
    setShowModal(!showModal)
}
return {modal, togleModal, showModal}
}
