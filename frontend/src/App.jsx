import './App.css'

import { BrowserRouter,Route,Routes } from 'react-router-dom'

import Home from './Pages/Home.jsx'

import Wishlist from './Pages/Wishlist.jsx'

import Nav from "./Components/Nav.jsx"

import Login from './Pages/Login.jsx'


function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
