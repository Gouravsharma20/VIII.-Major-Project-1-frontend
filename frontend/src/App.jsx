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
  const [loading,setLoading] = useState(true)
  const [giftcards, setGiftCards] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [cart,setCart] = useState([])
  const [wishList,setWishList] = useState([])


  const [homeSearchResult, setHomeSearchResult] = useState(null)
  const [homeSearchNotFound,setHomeSearchNotFound] = useState(false)
  const [searchedCard,setSearchedCard] = useState(null)
  const [searchError,setSearchError] = useState("")

  // const [productDetails,setProductDetails] = useState("")

  useEffect(()=>{
        const fetchGiftCards = async () => {
            try {
              setLoading(true)
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
            } finally {
              setLoading(false)
            }
        }
        fetchGiftCards()
     },[selectedCategory])

    const categories = [...new Set(giftcards.map((card)=>card.giftCardCategory))]

    function searchCategory(terms) {
      const match = categories.find((cat)=>cat.toLowerCase() === terms.toLowerCase())
      if (match) {
      setHomeSearchResult(match)
      setHomeSearchNotFound(false)
    } else {
      setHomeSearchResult(null)
      setHomeSearchNotFound(true)
    }
    }

    async function searchGiftCardByTitle(title) {
      setLoading(true)
      try {
        setSearchError("")
        const result = await fetch(`https://viii-major-project-backend.vercel.app/title/${title}`)
        const data = await result.json()

        if (result.ok && data.foundGiftCard.length > 0 ) {
          setSearchedCard(data.foundGiftCard)
        } else {
          setSearchedCard(null)
          setSearchError(`no gift card found with title ${title}`)
        }

      } catch(err) {
        console.log("search failed", err)
        setSearchedCard(null)
        setSearchError("Something went wrong while searching")
      }finally {
        setLoading(false)
      }
      
    }
    

  return (
    <BookContext.Provider value={{
      giftcards,
      setGiftCards,
      selectedCategory,
      setSelectedCategory,
      cart,
      setCart,
      wishList,
      setWishList,
      homeSearchResult,
      homeSearchNotFound,
      categories,
      searchCategory,
      loading,
      searchedCard,
      searchError,
      searchGiftCardByTitle
      }}>
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
