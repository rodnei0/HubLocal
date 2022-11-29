import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignIn from './features/User/SignIn'
import SignUp from './features/User/Signup'
import AddCompany from './features/Company/AddCompany'
import CompanyList from './features/Company/CompanyList'
import EditCompany from './features/Company/EditCompany'
import Home from './features/Home/Home'
import AddLocation from './features/Location/AddLocation'
import EditLocation from './features/Location/EditLocation'
import LocationList from './features/Location/LocationList'
import TicketList from './features/Ticket/TicketList'
import EditTicket from './features/Ticket/EditTicket'

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
        <Route path="/add-location" element={<AddLocation />} />
        <Route path="/edit-location/:id" element={<EditLocation />} />
        <Route path="/location-list" element={<LocationList />} />
        <Route path="/edit-ticket/:id" element={<EditTicket />} />
        <Route path="/ticket-list" element={<TicketList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
