import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignUp from './pages/SignUp'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
