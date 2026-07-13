import { useContext } from "react"
import GiftCardContext from "../Context/GiftCardContext"


import deleteIcon from "../Assets/delete.svg"

import { useNavigate } from "react-router-dom"



export default function Wishlist(){
    const {productDetail, wishList,removeFromWishList,setProductDetail,addToCart } = useContext(GiftCardContext)

    function addToCardHandler(card) {
          addToCart(card)
          removeFromWishList(card._id)
      }

    async function handleDelete(itemId) {
        removeFromWishList(itemId)
    }

    const navigate = useNavigate()

    function showProductDetailsHandler(card) {
      setProductDetail(card)
      navigate("/productDetails")
    }

    

    return (
        <>
        {wishList.length === 0 ? (
            <p>No items in wishlist</p>
        ) : (
            wishList.map((item, index) => (
                <div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={item.giftCardImage}
                                className="img-fluid rounded-start"
                                alt={item.giftCardTitle}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body p-2">
                                <img src={deleteIcon} alt="delete" className="float-end" width="20" height="20" style={{cursor: "pointer"}} onClick={() => handleDelete(item._id)}/>
                                <h5 className="card-title">{item.giftCardTitle}</h5>
                                
                                <p className="card-text">Redemable: {item.redemptionType}</p>
                                <button onClick = {()=>showProductDetailsHandler(item)}>Show Product Details</button>
                                <button onClick={() => addToCardHandler(item)} className="card-link">
            Add to Cart
          </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}
        </>
    )
}