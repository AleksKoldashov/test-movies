import React from "react";

export const MyReduserContext = React.createContext({})as any

const local = JSON.parse(localStorage.getItem('user')as string)
console.log(!!local);

export const InitState:any ={
    valueSearch: 'wars',
    pagination: 1,
    favorites:[],
    auth: !!local
  }

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
                return{
                    ...state, 
                    favorites: [...state.favorites, action.payload]}
            case 'updateFavorites':
                return{
                    ...state, 
                    favorites: action.payload}
            default:
                break;
        }
  }