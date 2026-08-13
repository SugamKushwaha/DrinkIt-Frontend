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
import VendorDash from './pages/vendor/VendorDash';
import VendorOrdersPage from './pages/vendor/VendorOrdersPage';
import VendorProductsPage from './pages/vendor/VendorProductsPage';
import VendorOrderDetails from './Components/vendor/order/VendorOrderDetails';
import VendorOrderDetailsPage from './pages/vendor/VendorOrderDetailsPage';
import VendorInventoryPage from './pages/vendor/VendorInventoryPage';
import VendorEarningsPage from './pages/vendor/VendorEarningsPage';
import VendorProfilePage from './pages/vendor/VendorProfilePage';

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


         {/* ----Vendor Routs---- */}

         <Route path="/vendor" element={<VendorDash />} />
         <Route path="/vendor/orders" element={<VendorOrdersPage />} />
         <Route path="/vendor/orders/:orderId" element={<VendorOrderDetailsPage />} />
         <Route path="/vendor/products" element={<VendorProductsPage />} />
         <Route path="/vendor/inventory" element={<VendorInventoryPage />} />
         <Route path="/vendor/earnings" element={<VendorEarningsPage />}/>
         <Route path="/vendor/profile" element={<VendorProfilePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
