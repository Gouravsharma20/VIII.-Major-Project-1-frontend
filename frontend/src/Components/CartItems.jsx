import { useContext } from "react";
import GiftCardContext from "../Context/GiftCardContext";
import deleteIcon from "../Assets/delete.svg";
import { Link, useNavigate } from "react-router-dom";

import wishlistIcon from "../Assets/wishlist.svg"

export default function CartItems() {
    const { cart, removeFromCart, setProductDetail,message,addToWishList,setCart,setMessage } = useContext(GiftCardContext);
    const navigate = useNavigate();

    function handleDelete(itemId) {
        removeFromCart(itemId);
    }

    function showProductDetailsHandler(card) {
        setProductDetail(card);
        navigate("/productDetails");
    }

    async function handleProceedToPayment(event) {
        event.preventDefault()
        try {
            const response = await fetch("https://viii-major-project-backend.vercel.app/order/UserOrder",{
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body:JSON.stringify({cart,totalAmount})
            })

            const data = await response.json()

            

            if (!response.ok) {
                console.log("Order failed:", data.error || data.err);
            return;
            }

            navigate("/success");

        } catch(err) {
            console.log(err)
        }
        
    }

    function addToWishListHandler(card) {
      addToWishList(card)
    }

    if (cart.length === 0) {
        return <p>Cart is empty</p>;
    }

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.giftCardBalance * item.quantity,
        0
    );

    function increaseQuantity(product) {
  setCart((prev) =>
    prev.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  )
    }


  function decreaseQuantity(product) {
  setCart((prev) =>
    prev.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  )
  }

    

    return (
        <>
        {message && <p className="text-success">{message}</p>}
            <ul className="list-unstyled">
                {cart.map((item, index) => (
                    <li key={item._id ?? index}>
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
                                        <img
                                            src={deleteIcon}
                                            alt="delete"
                                            className="float-end"
                                            width="20"
                                            height="20"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleDelete(item._id)}
                                        />
                                        <h5 className="card-title">
                                            {item.giftCardTitle.length > 5
                                                ? item.giftCardTitle.slice(0, 5) + ".."
                                                : item.giftCardTitle}
                                        </h5>
                                        <img  className="float-end" src={wishlistIcon} length="25" width="25" pl-2 style={{cursor:"pointer"}} onClick={()=>addToWishListHandler(item)}/>
                                        <p className="card-text">Balance: {item.giftCardBalance}</p>

                                        <div className="d-flex align-items-center gap-2 ms-5">
  <button onClick={()=>increaseQuantity(item)}
    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center "
    style={{ width: "28px", height: "28px", padding: 0 }}
  >
    +
  </button>

  <p className="card-text mb-0">Quantity: {item.quantity}</p>

  <button onClick={()=>decreaseQuantity(item)}
    className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center "
    style={{ width: "28px", height: "28px", padding: 0 }}
  >
    -
  </button>
</div>

                                        
                                        <p className="card-text">
                                            <small className="text-body-secondary">
                                                Redemable: {item.redemptionType}
                                            </small>
                                        </p>
                                        
                                        <button onClick={() => showProductDetailsHandler(item)}>
                                            Show Product Details
                                        </button>
                                        <Link className="btn btn-primary" to={"/adress"}>
                                            Add delivery adress
                                        </Link>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="cart-summary d-flex justify-content-between align-items-center p-3">
                <h5>Total: {totalAmount}</h5>
                <button className="btn btn-success" onClick={handleProceedToPayment}>
    Proceed to Payment
</button>
            </div>
        </>
    );
}