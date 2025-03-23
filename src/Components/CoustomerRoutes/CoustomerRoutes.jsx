import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import FrontPage from '../Pages/FrontPage'
import ChatPage from '../Pages/ChatPage'

const CoustomerRoutes = () => {
  return (
    
       <Routes>
       <Route path='/' element={<FrontPage />} />
       <Route path='/chatPage' element={<ChatPage />} />
     </Routes>
    

  )
}

export default CoustomerRoutes