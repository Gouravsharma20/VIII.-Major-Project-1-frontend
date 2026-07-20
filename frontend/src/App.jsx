  import { useCallback, useEffect, useState } from 'react'
  import './App.css'

  import UserProfile from "./Pages/UserProfile.jsx"

  import { ToastContainer } from 'react-toastify';

  

  import BookContext from './Context/GiftCardContext.jsx'

  import { BrowserRouter,Route,Routes } from 'react-router-dom'

  import Home from './Pages/Home.jsx'

  import Wishlist from './Components/Wishlist.jsx'



  import Nav from "./Components/Nav.jsx"
  import Login from './Pages/Login.jsx'
  import Products from './Pages/Products.jsx'

  import AdressPage from './Pages/AdressPage.jsx'

  import ProductDetails from './Pages/ProductDetails.jsx'
  import CartItems from './Components/CartItems.jsx'

  import SuccessPage from './Pages/SuccessPage.jsx'

  import SignUp from './Pages/SignUp.jsx';

import ViewOrders from './Components/ViewOrders.jsx'

import { toast } from 'react-toastify';
import Footer from './Components/Footer.jsx';
import AdressList from './Pages/AdressList.jsx';


  function App() {
    const [loading,setLoading] = useState(true)
    const [giftcards, setGiftCards] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [cart,setCart] = useState([])
    const [wishList,setWishList] = useState([])
    


    const [homeSearchResult, setHomeSearchResult] = useState(null)
    const [homeSearchNotFound,setHomeSearchNotFound] = useState(false)
    const [searchedCard,setSearchedCard] = useState(null)
    const [searchError,setSearchError] = useState("")

    const [placedOrders, setPlacedOrders] = useState([]);
    
    

    const [productDetail,setProductDetail] = useState([])

    const [address, setAddress] = useState([])

    const [selectedAdress,setSelectedAdress] = useState(null)

    function addAddress(newAdress) {
      setAddress((prev)=>[...prev,newAdress])

    }

    function removeAdress(userId) {
      setAddress((prev)=>prev.filter((a)=>a._id !== userId))
      setSelectedAdress((prev)=>(prev === userId ? null : prev))
    }

    function selectAddress(addressId) {
      setSelectedAdress(addressId)
    }


    useEffect(()=>{
          const fetchGiftCards = async () => {
              try {
                setLoading(true)
                  let url = "https://viii-major-project-backend.vercel.app/card/allgiftCards"
              if (selectedCategory) {
                  url = `https://viii-major-project-backend.vercel.app/card/category/${selectedCategory}`
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

      const searchCategory = useCallback((terms) => {
        const match = categories.find((cat)=>cat.toLowerCase() === terms.toLowerCase())
        if (match) {
        setHomeSearchResult(match)
        setHomeSearchNotFound(false)
      } else {
        setHomeSearchResult(null)
        setHomeSearchNotFound(true)
      }
      },[categories]) 

      const clearSearch = useCallback(() => {
        setSearchedCard(null)
        setSearchError("")
        setHomeSearchResult(null)
        setHomeSearchNotFound(false)

      },[])

      async function searchGiftCardByTitle(title) {
        setLoading(true)
        try {
          setSearchError("")
          const result = await fetch(`https://viii-major-project-backend.vercel.app/card/title/${title}`)
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
      
      function removeFromWishList(itemId){
        setWishList((prev)=>prev.filter(item=>item._id !== itemId))
        

      }

      function removeFromCart(itemId){
        setCart((prev)=>prev.filter(item=>item._id !== itemId))
      }

      function addToCart(product) {
        const productAlreadyExist = cart.some((item)=>item._id === product._id)
        if (productAlreadyExist) {
            setCart((prev)=>prev.map((item)=>
              item._id === product._id ? {...item,quantity:item.quantity + 1}:item))
            toast.success(`${product.giftCardTitle} quantity updated successfully`)
        } else {
          setCart((prev)=>[...prev,{...product,quantity:1}])

          toast.success(`${product.giftCardTitle} added successfully to cart`)
        }
      }

      function addToWishList(card) {
        const alreadyExist = wishList.some((item)=>item._id === card._id)
        if(alreadyExist){
          toast.error(`${card.giftCardTitle} already exists in the wishlist`)
          return
        }
        setWishList((prev) => [...prev, card])

        toast.success(`${card.giftCardTitle} added to the wishlist successfuly!`)
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
        searchGiftCardByTitle,
        productDetail,
        setProductDetail,
        removeFromWishList,
        removeFromCart,
        addToCart,
        addToWishList,
        clearSearch,
        placedOrders,
        setPlacedOrders,
        address,
        setAddress,
        addAddress,
        removeAdress,
        selectedAdress,
        selectAddress
        }}>
      <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
         <Nav/>
      <ToastContainer position="top-right" autoClose={2000} />
      <main className="flex-grow-1">
        <Routes>
        
        <Route path = "/" element={<Home/>}/>
        <Route path='/product/:category' element={<Products/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/productDetails' element={<ProductDetails/>}/>
        <Route path='/cart' element={<CartItems/>}/>
        <Route path='/wishList' element={<Wishlist/>}/>
        <Route path='/adress' element={<AdressPage/>}/>
        <Route path="/success" element={<SuccessPage />} />
        <Route path='/viewOrders' element={<ViewOrders/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/adresslist' element={<AdressList/>}/>
      </Routes>
      </main>
      <Footer/>
      </div>
     
      </BrowserRouter>
      </BookContext.Provider>
    )
  }

  export default App
