import {useContext,useEffect} from "react"

import { useParams } from "react-router-dom"

import BookContext from "../Context/GiftCardContext"

export default function Products() {
    const {giftcards,setSelectedCategory,setCart,setWishList} = useContext(BookContext)
     const {category} = useParams()

    useEffect(()=>{setSelectedCategory(category)},[category])

    function addToCardHandler(card) {
        setCart((prev)=>[...prev,card])

    }

    function addToWishListHandler(card) {
      setWishList((prev)=>[...prev,card])
    }


    return (
        <>
        {giftcards.map((card)=>(
                <div className="card mb-3" style={{ maxWidth: "540px" }} key={card._id}>
    <div className="row g-0">
      <div className="col-md-4">
        <img
          src={card.giftCardImage}
          className="img-fluid rounded-start"
          alt={card.giftCardCategory}
        />
      </div>

      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title"> Category : {card.giftCardCategory}</h5>

          <p className="card-text">
            Term and conditions : {card.redemptionTerms}
          </p>

          <p className="card-text">
            <small className="text-body-secondary">
              Expiry Date : {card.giftCardexpiryDate}
            </small>
          </p>
          <button onClick={()=>addToWishListHandler(card)}>Add to Wishlist</button>
          <button onClick={()=>addToCardHandler(card)}>Add to Cart</button>
          
        </div>
      </div>
    </div>
  </div>

          ))}
        </>
        
    )
}