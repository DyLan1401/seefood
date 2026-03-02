import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {

  return (
    <Routes>
      <Route>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetail />} />

      </Route>
    </Routes>
  )
}

export default App
