  import { useContext } from "react"
  import GiftCardContext from "../Context/GiftCardContext"

  import wishlistIcon from "../Assets/wishlist.svg"



  export default function ProductDetails() {
      const {productDetail,loading,addToCart,addToWishList,message} = useContext(GiftCardContext)

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
        <>
        {message && <p className="text-success">{message}</p>}
        <div className="d-flex justify-content-center align-items-center min-vh-10 p-5">
  <div className="card" style={{ width: "45rem" }}>
    <div className="row g-0">
      <div className="col-md-4">
        <img
          src={productDetail.giftCardImage}
          className="img-fluid rounded-start h-100"
          style={{ objectFit: "cover" }}
          alt={productDetail.giftCardTitle}
        />
        
      </div>
      
      <div className="col-md-8">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">
              {productDetail.giftCardTitle}
            </h5>
            <img
            src={wishlistIcon}
            alt="Wishlist"
            height="30"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={() => addToWishListHandler(productDetail)}
            />
          </div>
          <p className="card-text">{productDetail.redemptionTerms}</p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">Card:{productDetail.giftCardNumber}</li>
          <li className="list-group-item">Pin:{productDetail.giftCardPin}</li>
          <li className="list-group-item">Type:{productDetail.redemptionType}</li>
          <li className="list-group-item">Expiry:{productDetail.giftCardexpiryDate}</li>
          <li className="list-group-item">Balance:{productDetail.giftCardBalance}</li>
        </ul>

        <div className="card-body">
          
          <button className="btn btn-success" onClick={() => addToCardHandler(productDetail)} className="card-link">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
          
          
      )
  }