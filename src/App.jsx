import React from 'react'
import './Style.css'
import Navbar from './components/Navbar'
import { ProductsList } from './components/ProductsList'
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

const App = () => {
  return (
    <> <Navbar />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
     
      
    </>
  )
}

export default App


