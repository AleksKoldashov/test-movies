import React from 'react'
import '../UI/uiStyles.css'

export default function useModal({...props}) {
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
            <div className="modal-content">
                    {
                        props.content
                    }
            </div>
            <footer></footer>
        </div>
        <div className='opcy'></div>
        </>
      )
}
const togleModal=(b:boolean)=>{
    setShowModal(b)
}
return {modal, togleModal, showModal}
}
