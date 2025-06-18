import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import Home from './pages/Home'
import EmailVerify from './pages/EmailVerify'
import NotFound from './pages/NotFound'
import Register from './pages/Regsiter'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgotPassword from './pages/ForgetPassowrd'
import ResetOtp from './pages/ResetOtp'
const App = () => {
  return (
    <div>
      <ToastContainer/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/email-verify" element={<EmailVerify />} />
  <Route path="/forget-password" element={<ForgotPassword />} />
  <Route path="/reset-otp" element={<ResetOtp/>} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="*" element={<NotFound />} />
</Routes>


    </div>
  )
}

export default App