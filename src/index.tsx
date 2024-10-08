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
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './Utilits/ErrorFallback';




const router = createBrowserRouter([
  {
    element:  <App/>,
    path: '/', 
    errorElement: <ErrorPage/>,
    children: [
      {
        element:  <CardPage/>,
        path: '/:idmovies', 
        errorElement: <ErrorPage/>,
        children: []
      },
      {
        element:  <ContentPage/>,
        path: '/home', 
        errorElement: <ErrorPage/>,
        children: []
      },
      {
        element:  <Favorites/>,
        path: '/favorites', 
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
       <ErrorBoundary 
       FallbackComponent={ErrorFallback}
       onReset={()=>console.log('error')}
       >
        <RouterProvider router={router}/>
       </ErrorBoundary>
        
      
    </React.StrictMode>
  </Provider>

);

