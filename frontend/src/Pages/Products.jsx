import {useContext,useEffect, useState} from "react"

import { useParams } from "react-router-dom"

import GiftCardContext from "../Context/GiftCardContext"

import { useNavigate } from "react-router-dom"

import wishlistIcon from "../Assets/wishlist.svg"



export default function Products() {
    const {giftcards,setSelectedCategory,searchedCard,searchError,loading,setProductDetail,addToCart,addToWishList,clearSearch} = useContext(GiftCardContext)
    const [sortBy,setSortBy] = useState(null)
     const {category} = useParams()

     const navigate = useNavigate()

    useEffect(()=>{
      setSelectedCategory(category)
      clearSearch()
    },[category])


    function addToCardHandler(card) {
        addToCart(card)
    }

    function addToWishListHandler(card) {
      addToWishList(card)
    }

    function showProductDetailsHandler(card) {
      setProductDetail(card)
      navigate("/productDetails")
    }

    const baseCards = searchedCard ? searchedCard : giftcards

    const cardsToShow = [...baseCards].sort((a,b)=>{
      if (sortBy ==="az") {
        return a.giftCardTitle.localeCompare(b.giftCardTitle)
      } 
      if (sortBy === "price") {
        return a.giftCardBalance - b.giftCardBalance
      } return 0
    })

    

    if (loading) {
      return <p>Loading gift cards ...</p>
    }


    return (
        <>
        <div className="d-flex justify-content-end pe-4 pt-2">
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Sort By
    </button>

    <ul className="dropdown-menu">
      <li><button className="dropdown-item" onClick={()=>setSortBy(null)}>Default</button></li>
      <li><button className="dropdown-item" onClick={()=>setSortBy("az")}>A-Z</button></li>
      <li><button className="dropdown-item" onClick={()=>setSortBy("price")}>Price(low to high)</button></li>
    </ul>
  </div>
</div>

        {searchError && <p className="text-danger">{searchError}</p>}
        {cardsToShow.map((card)=>(
                <div className="card mb-3" style={{ maxWidth: "540px" }} key={card._id}>
    <div className="row g-0">
      <div className="col-md-4">
  <img
    src={card.giftCardImage}
    alt={card.giftCardTitle}
    className="rounded-start mx-auto d-block mt-4"
    style={{ height: "150px", width: "150px", objectFit: "cover" }}
  />
</div>
      
      

      <div className="col-md-8">
        <div className="card-body">
          
          <img  className="float-end" src={wishlistIcon} length="30" width="30" pl-6 style={{cursor:"pointer"}} onClick={()=>addToWishListHandler(card)}/>
          <h5 className="card-title">{card.giftCardTitle}</h5>
          
          

          <p className="card-text">
            Term and conditions : {card.redemptionTerms}
          </p>

          <p className="card-text">
            <small className="text-body-secondary">
              Expiry Date : {card.giftCardexpiryDate}
            </small>
          </p>
          
          <button onClick={()=>addToCardHandler(card)}>Add to Cart</button>
          <button onClick={()=>showProductDetailsHandler(card)}>Show Product details</button>

          
          
        </div>
      </div>
    </div>
  </div>

          ))}
        </>
        
    )
}