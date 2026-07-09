import { useContext } from "react";

import GiftCardContext from "../Context/GiftCardContext";

import deleteIcon from "../Assets/delete.svg"

import {useNavigate} from "react-router-dom"

export default function CartItems() {

    const {cart,removeFromCart,setProductDetail} = useContext(GiftCardContext)

    function handleDelete(itemId) {
      removeFromCart(itemId)
    }

    const navigate = useNavigate()

    function showProductDetailsHandler(card) {
      setProductDetail(card)
      navigate("/productDetails")
    }

    return cart.length === 0 ? (
    <p>Cart is empty</p>
) : (
        cart.map((item,index) => (
      <li key={index}>
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img
        src={item.giftCardImage}
        className="img-fluid rounded-start"
        alt="..."
      />
    </div>

    <div className="col-md-8">
      <div className="card-body">
        <img src={deleteIcon} alt="delete" className="float-end" width="20" height="20" style={{cursor: "pointer"}} onClick={() => handleDelete(item._id)}/>
        <h5 className="card-title">{item.giftCardTitle.length > 5
    ? item.giftCardTitle.slice(0, 5) + ".."
    : item.giftCardTitle}</h5>

        <p className="card-text">
          Balance:{item.giftCardBalance}
        </p>

        <p className="card-text">Quantity: {item.quantity}</p>

        <p className="card-text">
          <small className="text-body-secondary">
            Redemable:{item.redemptionType}
          </small>
        </p>
        <button onClick = {()=>showProductDetailsHandler(item)}>Show Product Details</button>
      </div>
    </div>
  </div>
</div>

      </li>
      
    ))
    )

}