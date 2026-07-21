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

  import ProductCheckout from './Pages/ProductCheckout.jsx';

import ViewOrders from './Components/ViewOrders.jsx'

import { toast } from 'react-toastify';
import Footer from './Components/Footer.jsx';
import AdressList from './Pages/AdressList.jsx';


  function App() {
    const [loading,setLoading] = useState(true)
    const [giftcards, setGiftCards] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [cart,setCart] = useState(() => {
    try {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
        return [];
    }
})
    const [wishList,setWishList] = useState(() => {
    try {
        const stored = localStorage.getItem("wishList");
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error("Failed to parse wishList from localStorage", err);
        return [];
    }
})
    


    const [homeSearchResult, setHomeSearchResult] = useState(null)
    const [homeSearchNotFound,setHomeSearchNotFound] = useState(false)
    const [searchedCard,setSearchedCard] = useState(null)
    const [searchError,setSearchError] = useState("")

    const [placedOrders, setPlacedOrders] = useState([]);
    
    

    const [productDetail,setProductDetail] = useState([])

    const [address, setAddress] = useState(() => {
    try {
        const stored = localStorage.getItem("address");
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error("Failed to parse address from localStorage", err);
        return [];
    }
})

    const [selectedAdress,setSelectedAdress] = useState(() => {
    try {
        const stored = localStorage.getItem("selectedAdress");
        return stored ? JSON.parse(stored) : null;
    } catch (err) {
        console.error("Failed to parse selectedAdress from localStorage", err);
        return null;
    }
})

    const [allCategories, setAllCategories] = useState([])

    const [user] = useState({
    _id: "6a51ed5b39587a2d83b6b59b",
    name: "Gourav Sharma",
    email: "gouravsharma20a@gmail.com",
  })


    function addAddress(newAdress) {
      setAddress((prev)=>[...prev,newAdress])
    }

    async function removeAdress(addressId) {
    try {
      setLoading(true)
      const response = await fetch(
        `https://viii-major-project-backend.vercel.app/user/${user._id}/deleteUser`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addressId })
        }
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to delete address")
      }

      setAddress((prev) => prev.filter((a) => a._id !== addressId))
      setSelectedAdress((prev) => (prev === addressId ? null : prev))
      toast.success("Address deleted successfully")
      return data
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete address")
      throw err
    } finally {
      setLoading(false)
    }
  }


    // function removeAdress(userId) {
    //   setAddress((prev)=>prev.filter((a)=>a._id !== userId))
    //   setSelectedAdress((prev)=>(prev === userId ? null : prev))
    // }

    function selectAddress(addressId) {
      setSelectedAdress(addressId)
    }

    async function editAdress(userId,updatedAddress) {
      try {
      setLoading(true)
      const response = await fetch(
        `https://viii-major-project-backend.vercel.app/user/${userId}/editAdress`,
        {
          method: "PATCH",
          headers : {
            "content-Type":"application/json"
          },body: JSON.stringify(updatedAddress)
        }
      );
      const data = await response.json();
      if (!response.ok) {
      throw new Error(data.message || "Failed to update address");
    }
    return data
    } catch(err) {
      console.error(err);
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function fetchUserAddresses() {
      try {
        const response = await fetch(`https://viii-major-project-backend.vercel.app/user/${user._id}`)
        const data = await response.json()
        if (response.ok) {
          setAddress(data.User?.addresses || [])
        }
      } catch (err) {
        console.log("failed to fetch user addresses", err)
      }
    }
    fetchUserAddresses()
  }, [])



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


      useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await fetch("https://viii-major-project-backend.vercel.app/card/allgiftCards")
        const data = await response.json()
        const cards = data.giftCards || []
        const cats = [...new Set(cards.map(card => card.giftCardCategory))]
        setAllCategories(cats)
      } catch (err) {
        console.log("error fetching categories", err)
      }
    }
    fetchAllCategories()
  }, [])

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

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  useEffect(() => {
      localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

 
  useEffect(() => {
      localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  
  useEffect(() => {
      localStorage.setItem("selectedAdress", JSON.stringify(selectedAdress));
  }, [selectedAdress]);

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
        selectAddress,
        allCategories,
        editAdress,
        user
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
        <Route path='/productCheckout' element={<ProductCheckout/>}/>
      </Routes>
      </main>
      <Footer/>
      </div>
     
      </BrowserRouter>
      </BookContext.Provider>
    )
  }

  export default App
