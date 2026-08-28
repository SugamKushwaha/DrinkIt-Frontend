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

import DeliveryLayoutPage from './pages/delivery/DeliveryLayoutPage';
import DeliveryDashboardPage from './pages/delivery/DeliveryDashboardPage';
import DeliveryOrdersPage from './pages/delivery/DeliveryOrdersPage';
import DeliveryOrderDetailsPage from './pages/delivery/DeliveryOrderDetailsPage';
import DeliveryEarningsPage from './pages/delivery/DeliveryEarningsPage';
import DeliveryProfilePage from './pages/delivery/DeliveryProfilePage';

import PartnerPage from './pages/partner/PartnerPage'
import DeliveryRegistration from './pages/partner/DeliveryRegistration';
import VendorRegistration from './pages/partner/VendorRegistration';
import ApplicationStatus from './pages/partner/ApplicationStatus';

import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLayout from './Components/admin/AdminLayout'
import VendorsPage from './pages/admin/VendorsPage'
import VendorRequestsPage from './pages/admin/VendorRequestsPage'
import VendorDetailsPage from './pages/admin/VendorDetailsPage'
import DeliveryPartnersPage from './pages/admin/DeliveryPartnersPage'
import DeliveryRequestsPage from './pages/admin/DeliveryRequestsPage'
import DeliveryPartnerDetailsPage from './pages/admin/DeliveryPartnerDetailsPage'
import ProductsPage  from './pages/admin/ProductsPage'
import AddProductPage from './pages/admin/AddProductPage'
import EditProductPage from './pages/admin/EditProductPage'
import AdminsPage from './pages/admin/AdminsPage'
import AddAdminPage from './pages/admin/AddAdminPage'
import UsersPage from './pages/admin/UsersPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'

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


         {/* ---- Delivery Routs ----- */}

         <Route path="/delivery" element={<DeliveryLayoutPage />}>
            <Route index element={<DeliveryDashboardPage />}/>
        </Route>
        <Route path="/delivery/orders" element={<DeliveryOrdersPage />}/>
        <Route path="/delivery/orders/:orderId" element={<DeliveryOrderDetailsPage />}/>
        <Route path="/delivery/earnings" element={<DeliveryEarningsPage />}/>
        <Route path="/delivery/profile" element={<DeliveryProfilePage />}/>


          {/* ---- Partners---- */}

          <Route path="/partner" element={<PartnerPage />}/>
          <Route path="/partner/vendor/register" element={<VendorRegistration />}/>
          <Route path="/partner/delivery/register" element={<DeliveryRegistration />}/>
          <Route path="/partner/application-status"  element={<ApplicationStatus />}/>


          {/* ----- Admins ------ */}

          <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<AdminDashboardPage />} />
             <Route path="vendors" element={<VendorsPage />}/>
             <Route path="vendors/requests" element={<VendorRequestsPage />}/>
             <Route path="vendors-requests/:id" element={<VendorDetailsPage />}/>
             <Route path="vendors/:id" element={<VendorDetailsPage />}/>
             <Route path="delivery-partners" element={<DeliveryPartnersPage />}/>
             <Route path="delivery-partners/requests" element={<DeliveryRequestsPage />}/>
             <Route path="delivery-partners/:id" element={<DeliveryPartnerDetailsPage />}/>
             <Route path="products" element={<ProductsPage />}/>
             <Route path="products/add" element={<AddProductPage />}/>
             <Route path="products/edit/:id" element={<EditProductPage />}/>
             <Route path="admins" element={<AdminsPage />}/>
             <Route path="admins/add" element={<AddAdminPage />}/>
             <Route path="users" element={<UsersPage />}/>
             <Route path="settings" element={<AdminSettingsPage />}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
