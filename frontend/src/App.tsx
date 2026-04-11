import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Resigter from './pages/Register'
import CategoryDetail from './pages/CategoryDetail'
import Categories from './pages/Categories'
import UserOrders from './pages/UserOrders'
import Error404 from './pages/error404'
import DashboardOverview from './pages/admin/DashboardOverview'
import { ToastContainer } from './component/ToastContainer'
import OrderDetail from './pages/OrderDetail'

import AdminLayout from './component/admin/adminLayout'
import AdminProducts from './pages/admin/AdminProduct'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCategories from './pages/admin/AdminCategories'
import AdminUsers from './pages/admin/AdminUsers'

function App() {

  return (
    <>
      <Routes>
        {/* User */}
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Resigter />} />
        <Route path="/product/category/:slug" element={<CategoryDetail />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/my-order' element={<UserOrders />} />
        <Route path="/order/:id" element={<OrderDetail />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />} >

          <Route index element={<DashboardOverview />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/users" element={<AdminUsers />} />
        </Route >

        <Route path="*" element={<Error404 />} />

      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
