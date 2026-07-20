



import { useContext } from "react";
import GiftCardContext from "../Context/GiftCardContext";
import deleteIcon from "../Assets/delete.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import wishlistIcon from "../Assets/wishlist.svg"

export default function CartItems() {
    const { cart, removeFromCart, setProductDetail, addToWishList, setCart, setPlacedOrders,address,selectedAdress} = useContext(GiftCardContext);
    const navigate = useNavigate();

    const selectedAddressObj = address?.find((a) => a._id === selectedAdress);

    function handleDelete(itemId) {
        removeFromCart(itemId);
    }

    function showProductDetailsHandler(card) {
        setProductDetail(card);
        navigate("/productDetails");
    }

    async function handleProceedToPayment(event) {
        event.preventDefault()
        if (!selectedAddressObj) {
            toast.error("Please select a delivery address before proceeding");
            return;
        }
        try {
            const response = await fetch("https://viii-major-project-backend.vercel.app/order/UserOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart, totalAmount,address: selectedAddressObj })
            })

            const data = await response.json()

            if (!response.ok) {
                console.log("Order failed:", data.error || data.err);
                return;
            }

            setPlacedOrders((prev) => [...prev, ...cart]);

            setCart([]);

            navigate("/success");

        } catch (err) {
            console.log(err)
        }
    }

    function addToWishListHandler(card) {
        addToWishList(card)
    }

    if (cart.length === 0) {
        return (
            <div className="container text-center text-muted py-5">
                <p className="fs-5 mb-0">Your cart is empty</p>
                <p className="small">Add some gift cards to get started</p>
            </div>
        );
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
        toast.success("Quantity increased successfully");
    }

    function decreaseQuantity(product) {
        if (product.quantity<=1){
            toast.error("product cannot be negative")
            return
        }
        setCart((prev) =>
            prev.map((item) =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        )
        toast.success("Quantity decreased successfully");
    }

    return (
        <div className="container py-4" style={{ maxWidth: "700px" }}>
            <h3 className="mb-4 fw-semibold">My Cart</h3>

            <div className="d-flex flex-column gap-3 mb-4">
                {cart.map((item, index) => (
                    <div
                        className="card shadow-sm border-0"
                        style={{ borderRadius: "12px", overflow: "hidden" }}
                        key={item._id ?? index}
                    >
                        <div className="row g-0">
                            <div className="col-4 col-md-3 d-flex align-items-center justify-content-center bg-light">
                                <img
                                    src={item.giftCardImage}
                                    alt={item.giftCardTitle}
                                    className="rounded"
                                    style={{ height: "110px", width: "110px", objectFit: "cover", margin: "12px" }}
                                />
                            </div>
                            <div className="col-8 col-md-9">
                                <div className="card-body p-3 position-relative">
                                    <img
                                        src={deleteIcon}
                                        alt="delete"
                                        className="position-absolute top-0 end-0 m-3"
                                        width="18"
                                        height="18"
                                        style={{ cursor: "pointer", opacity: 0.6, transition: "opacity 0.2s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                                        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
                                        onClick={() => handleDelete(item._id)}
                                    />

                                    <div className="d-flex align-items-center justify-content-center gap-2 pe-4">
                                        <h5 className="card-title mb-1">{item.giftCardTitle}</h5>
                                        <img
                                            src={wishlistIcon}
                                            width="20"
                                            height="20"
                                            style={{ cursor: "pointer", opacity: 0.7 }}
                                            onClick={() => addToWishListHandler(item)}
                                            alt="add to wishlist"
                                        />
                                    </div>

                                    <p className="card-text text-muted small mb-1">
                                        Balance: ₹{item.giftCardBalance}
                                    </p>
                                    <p className="card-text text-muted small mb-3">
                                        Redeemable: {item.redemptionType}
                                    </p>

                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <div className="d-flex align-items-center gap-2 border rounded-pill px-2 py-1">
                                            <button
                                                onClick={() => decreaseQuantity(item)}
                                                className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
                                                style={{ width: "24px", height: "24px", border: "none" }}
                                            >
                                                −
                                            </button>
                                            <span className="fw-medium" style={{ minWidth: "16px", textAlign: "center" }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => increaseQuantity(item)}
                                                className="btn btn-sm p-0 d-flex align-items-center justify-content-center"
                                                style={{ width: "24px", height: "24px", border: "none" }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 flex-wrap">
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => showProductDetailsHandler(item)}
                                        >
                                            View Details
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="d-flex justify-content-between align-items-center p-3 shadow-sm"
                style={{ borderRadius: "12px", background: "#f8f9fa" }}
            >
                <h5 className="mb-0">Total: ₹{totalAmount}</h5>




                {address && address.length > 0 ? (<Link className="btn btn-outline-dark btn" to={"/adresslist"}>
                   Select Delivery Address
                </Link> )  : (<Link className="btn btn-outline-dark btn" to={"/adress"}>
                     Add Delivery Address
                </Link>)}
                
                <button className="btn btn-success px-4" onClick={handleProceedToPayment}>
                    Proceed to Payment
                </button>
            </div>

            {selectedAddressObj && (
                 <div className="p-3 mt-3 shadow-sm" style={{ borderRadius: "12px", background: "#f8f9fa" }}>
        <h6 className="fw-semibold mb-2">Product will be delivered to</h6>
        <p className="mb-1 small">{selectedAddressObj.fullName} • {selectedAddressObj.mobileNumber}</p>
        <p className="mb-1 small">
            house no {selectedAddressObj.houseNo}, {selectedAddressObj.flatOrBuilding && `${selectedAddressObj.flatOrBuilding}, `}{selectedAddressObj.locality}
        </p>
        <p className="mb-1 small">
            {selectedAddressObj.landmark && `Near ${selectedAddressObj.landmark}, `}{selectedAddressObj.district}, {selectedAddressObj.state} - {selectedAddressObj.pincode}
        </p>
        <span className="badge bg-dark">{selectedAddressObj.addressType}</span>
    </div>
   
)}
        </div>
    );
}