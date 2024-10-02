import { Middleware } from '@reduxjs/toolkit'
import React from 'react'
import { store } from './store'

export const MyMiddleware: Middleware = (a:any)=>(next)=>(action)=>{
    const data = store.getState()
    console.log('data',data.movies.queries);
    console.log(next(action));
    return next(action)
}
