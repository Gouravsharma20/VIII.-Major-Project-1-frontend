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
        toast.info("gift card removed from cart !")
    }

    function showProductDetailsHandler(card) {
        setProductDetail(card);
        navigate("/productDetails");
    }

    function ProceedToCheckout() {
        navigate("/productCheckout")
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
        <div className="container py-4 px-3" style={{ maxWidth: "700px" }}>
            <h3 className="mb-4 fw-semibold">My Cart</h3>

            <div className="d-flex flex-column gap-3 mb-4">
                {cart.map((item, index) => (
                    <div
                        className="card shadow-sm border-0"
                        style={{ borderRadius: "12px", overflow: "hidden" }}
                        key={item._id ?? index}
                    >
                        <div className="row g-0">
                            <div className="col-4 col-md-3 position-relative d-flex align-items-center justify-content-center bg-light">
                                <img
                                    src={item.giftCardImage}
                                    alt={item.giftCardTitle}
                                    className="rounded"
                                    style={{ height: "90px", width: "90px", maxWidth: "100%", objectFit: "cover", margin: "12px" }}
                                />
                                <button
        onClick={() => addToWishListHandler(item)}
        className="btn btn-light rounded-circle shadow position-absolute"
        style={{
            top: "8px",
            right: "8px",
            width: "36px",
            height: "36px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2
        }}
    >
        <img
            src={wishlistIcon}
            alt="Wishlist"
            width="16"
            height="16"
        />
    </button>
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

                                    <div className="d-flex align-items-center gap-2 mb-2" style={{ paddingRight: "28px" }}>
                                        <h5 className="card-title mb-0" style={{ fontSize: "1rem" }}>{item.giftCardTitle}</h5>
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
                className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 p-3 shadow-sm"
                style={{ borderRadius: "12px", background: "#f8f9fa" }}
            >
                <h5 className="mb-0 text-center text-md-start">Total: ₹{totalAmount}</h5>

                <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
                    {/* {address && address.length > 0 ? (
                        <Link className="btn btn-outline-dark w-100 w-md-auto" to={"/adresslist"}>
                           Select Delivery Address
                        </Link>
                    ) : (
                        <Link className="btn btn-outline-dark w-100 w-md-auto" to={"/adress"}>
                             Add Delivery Address
                        </Link>
                    )} */}

                    <button className="btn btn-success px-4 w-100 w-md-auto" onClick={ProceedToCheckout}>
                        Proceed to Chekout
                    </button>
                </div>
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