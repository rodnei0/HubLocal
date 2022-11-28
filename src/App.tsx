import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignIn from './features/User/SignIn'
import SignUp from './features/User/Signup'
import AddCompany from './features/Company/AddCompany'
import CompanyList from './features/Company/CompanyList'
import EditCompany from './features/Company/EditCompany'
import Home from './features/Home/Home'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/edit-company/:id" element={<EditCompany />} />
        <Route path="/company-list" element={<CompanyList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
