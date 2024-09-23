import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './page/ErrorPage';
import CardPage from './page/CardPage';
import ContentPage from './page/ContentPage';
import Favorites from './page/Favorites';


const router = createBrowserRouter([
  {
    element:  <App/>,
    path: '/test-movies', 
    errorElement: <ErrorPage/>,
    children: [
      {
        element:  <CardPage/>,
        path: '/test-movies/:idmovies', 
        errorElement: <ErrorPage/>,
        children: []
      },
      {
        element:  <ContentPage/>,
        path: '/test-movies/home', 
        errorElement: <ErrorPage/>,
        children: []
      },
      {
        element:  <Favorites/>,
        path: '/test-movies/favorites', 
        errorElement: <ErrorPage/>,
        children: []
      },
    ]
  },
  
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
     
    </React.StrictMode>
  </Provider>

);

