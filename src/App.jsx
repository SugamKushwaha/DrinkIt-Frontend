import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Shop from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import WishListPage from './pages/WishListPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import Login from './Components/auth/Login';
import Signup from './Components/auth/Signup';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './Components/account/OrdersPage';
import AddressPage from './pages/AddressPage';
import TrackOrders from './Components/orderSuccess/TrackOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/shop" element={<Shop />} />
         <Route path="/product/:id" element={<ProductDetailsPage />}/>
         <Route path="/wishlist" element={<WishListPage />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/checkout" element={<CheckoutPage />} />
         <Route path="/order-success" element={<OrderSuccessPage/>}/>
         <Route path="/orders" element={<MyOrders />} />
         <Route path="/account/addresses" element={<AddressPage/>}/>
         <Route path="/track-order/:orderId"element={<TrackOrders />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
