import React, { useEffect } from 'react'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ProductDetails from './pages/ProductDetailsPage'
import PageNotFound from './pages/404'
import OrderSuccessPage from './pages/OrderSuccessPage'
import UserOrderPage from './pages/UserOrderPage'
import UserProfilePage from './pages/UserProfilePage'
import Logout from './features/auth/components/Logout'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import AdminHome from './pages/AdminHome'
import AdminProductDetailsPage from './pages/AdminProductDetailsPage'
import './App.css'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from 'react-router-dom'
import Protected from './features/auth/components/Protected'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice'
import { selectLoggedInUser } from './features/auth/authSlice'
import { fetchLoggedInUserAsync } from './features/user/userSlice'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    )
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />
      </Protected>
    )
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout />
      </Protected>
    )
  },
  {
    path: '/product-details/:id',
    element: (
      <Protected>
        <ProductDetails />
      </Protected>
    )
  },
  {
    path: '/admin/product-details/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    )
  },

  {
    path: '/order-success/:id',
    element: <OrderSuccessPage />
  },
  {
    path: '/orders',
    element: <UserOrderPage />
  },
  {
    path: '/profile',
    element: <UserProfilePage />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/forgot-password',
    element: <ForgetPasswordPage />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])
function App () {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
