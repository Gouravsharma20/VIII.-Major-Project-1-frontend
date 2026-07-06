import { useEffect, useState } from 'react'
import './App.css'

import BookContext from './Context/GiftCardContext.jsx'

import { BrowserRouter,Route,Routes } from 'react-router-dom'

import Home from './Pages/Home.jsx'

import Wishlist from './Pages/Wishlist.jsx'

import Nav from "./Components/Nav.jsx"

import Login from './Pages/Login.jsx'
import Products from './Pages/Products.jsx'


function App() {
  const [giftcards, setGiftCards] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [cart,setCart] = useState([])
  const [wishList,setWishList] = useState([])
  const [searchTitle,setSearchTitle] = useState()

  useEffect(()=>{
        const fetchGiftCards = async () => {
            try {
                let url = "https://viii-major-project-backend.vercel.app/allgiftCards"
            if (selectedCategory) {
                url = `https://viii-major-project-backend.vercel.app/category/${selectedCategory}`
            }
            const response = await fetch(url)
            const data = await response.json()

            const cards = selectedCategory ? data.listOfGiftCards : data.giftCards
            setGiftCards(cards || [])

            } catch(err) {
                console.log("error fecthing gift cards ",err)
                throw err
            }
        }
        fetchGiftCards()
     },[selectedCategory])

  return (
    <BookContext.Provider value={{giftcards, setGiftCards,selectedCategory, setSelectedCategory,cart,setCart,wishList,setWishList}}>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path='/product/:category' element={<Products/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    </BrowserRouter>
    </BookContext.Provider>
  )
}

export default App
