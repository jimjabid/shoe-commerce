import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route,RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store.jsx'
import App from './App.jsx'
import './assets/styles/bootstrap.min.css'
import './assets/styles/index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index ={true} path="/" element={<HomeScreen/>}/>
    <Route  path="/product/:id" element={<ProductScreen/>}/>
    <Route  path="/cart" element={<CartScreen/>}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
   <RouterProvider router={router}/>
   </Provider>     
  </React.StrictMode>,
)
