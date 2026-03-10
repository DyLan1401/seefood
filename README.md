**Project**
--Seefood Project

**Technology**
Frontend: React.js + TypeScript + Tailwind CSS + React Query + Zustand
Backend: Node.js + Express + MySQL
Auth: JWT

**Description**
This project is a specialized e-commerce platform for seafood, allowing users to explore dried seafood products, 
order online, and track

**Live demo link**
Frontend: https://seafood-liard.vercel.app/
Backend API: https://seafood-vyx2.onrender.com/


**How to run locally**
frontend :
cd frontend
npm install
npm run dev

backend:
cd backend
npm install
npm run dev

**Screenshots**
![Trang chủ](image.png)

**API docs**
GET https://seafood-vyx2.onrender.com/api/product/all toàn bộ sản phẩm
GET https://seafood-vyx2.onrender.com/api/product/:slug sản phẩm chi tiết

GET https://seafood-vyx2.onrender.com/api/category/all toàn bộ danh mục
GET https://seafood-vyx2.onrender.com/api/category/:slug danh mục chi tiết

POST https://seafood-vyx2.onrender.com/api/user/login đăng nhập
POST https://seafood-vyx2.onrender.com/api/user/register đăng kí

GET https://seafood-vyx2.onrender.com/api/order/all toàn bộ đơn hàng
GET https://seafood-vyx2.onrender.com/api/order/create tạo đơn hàng (cần token)
PATCH https://seafood-vyx2.onrender.com/api/orders/:id/status cập nhật đơn hàng


**Admin test account**
--admin1@gmail.com
--1234561

