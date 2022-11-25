import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignIn from './features/User/SignIn'
import SignUp from './features/User/Signup'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
