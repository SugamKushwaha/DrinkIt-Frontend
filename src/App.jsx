import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Shop from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import WishListPage from './pages/WishListPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
         <Route path="/product/:id" element={<ProductDetailsPage />}/>
         <Route path="/wishlist" element={<WishListPage />} />
         <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
