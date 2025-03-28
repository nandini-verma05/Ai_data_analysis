import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import FrontPage from '../Pages/FrontPage'
import ChatPage from '../Pages/ChatPage'
import SignUpPage from '../Pages/SignUp'
import OTPVerification from '../signup-signin/otp'
import SignInPage from '../signup-signin/signin';

const CoustomerRoutes = () => {
  return (
    
       <Routes>
       <Route path='/' element={<FrontPage />} />
       <Route path='/chatPage' element={<ChatPage />} />
       <Route path='/signup' element={<SignUpPage/>} />
       <Route path='/signin' element={<SignInPage/>} />
       <Route path='/otp' element={<OTPVerification/>} />
     </Routes>
    

  )
}

export default CoustomerRoutes