import React from "react";

interface iUser{
    name:string;
    id: string;
    password:string;
    favorites: any [];
}
const clearuser={name: "", password: "", id: "", favorites: []}

export const MyReduserContext = React.createContext({})as any
const server = JSON.parse(localStorage.getItem('server')as string)
const user:iUser = JSON.parse(localStorage.getItem('user')as string)

export const InitState:any ={
    valueSearch: 'wars',
    pagination: 1,
    favorites:[],
    auth: user,
    togelLogin: true,
    server: server,
  }
// localStorage.clear()
 
  export const reducer=(state:any, action:any):any=>{
        switch (action.type) {
            case 'updateStr':
                return{
                    ...state, 
                    valueSearch: action.payload}
            case 'pagination':
                return{
                    ...state, 
                    pagination: action.payload}
            case 'addFavorites':
                localStorage.setItem('user', JSON.stringify({...state.auth, favorites: [...state.auth.favorites, action.payload]}))
                return{
                    ...state, 
                  favorites: [...state.favorites, action.payload],
                  auth: {...state.auth, favorites: [...state.auth.favorites, action.payload]}
                }
            case 'updateFavorites':
                localStorage.setItem('user', JSON.stringify({...state.auth, favorites: action.payload}))
                return{
                    ...state, 
                    favorites: action.payload,
                    auth: {...state.auth, favorites: action.payload}
                }
            case 'auth':
                return{
                    ...state, 
                    auth: action.payload}
            case 'togelLogin':
                return{
                    ...state, 
                    togelLogin: action.payload}
            default:
                break;
        }
  }