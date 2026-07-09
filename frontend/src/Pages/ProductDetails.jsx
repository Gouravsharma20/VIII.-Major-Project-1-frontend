  import { useContext } from "react"
  import GiftCardContext from "../Context/GiftCardContext"

  import wishlistIcon from "../Assets/wishlist.svg"



  export default function ProductDetails() {
      const {productDetail,loading,addToCart,addToWishList} = useContext(GiftCardContext)

      function addToCardHandler(card) {
          addToCart(card)

      }

      function addToWishListHandler(card) {
      addToWishList(card)
    }

      if (loading) {
        return <p>Loading gift card data ...</p>
      }

      if (!productDetail || productDetail.length === 0) { 
        return <p>No product selected.</p>
      }


      return (
          <div className="d-flex justify-content-center align-items-center min-vh-10 p-5">
              <div className="card" style={{ width: "18rem" }}>
    <img src={productDetail.giftCardImage} className="card-img-top" alt={productDetail.giftCardTitle} />
    <div className="card-body">
      <h5 className="card-title">{productDetail.giftCardTitle}</h5>
      <p className="card-text">
        {productDetail.redemptionTerms}
      </p>
    </div>

    <ul className="list-group list-group-flush">
      <li className="list-group-item">Card:{productDetail.giftCardNumber}</li>
      <li className="list-group-item">Pin:{productDetail.giftCardPin}</li>
      <li className="list-group-item">Type:{productDetail.redemptionType}</li>
      <li className="list-group-item">Expiry:{productDetail.giftCardexpiryDate}</li>
      <li className="list-group-item">Balance:{productDetail.giftCardBalance}</li>
      
    </ul>
    <div class="card-body">
      <img src={wishlistIcon} length="30" width="30" pl-6 style={{cursor:"pointer"}} onClick={()=>addToWishListHandler(productDetail)}/>
      {/* <button onClick={addToWishListHandler} class="card-link">Add to Wishlist</button> */}
      <button onClick={()=>addToCardHandler(productDetail)} class="card-link">Add to Cart</button>
    </div>
  </div>
          </div>
          
      )
  }