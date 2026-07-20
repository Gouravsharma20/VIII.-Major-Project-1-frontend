import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import GiftCardContext from "../Context/GiftCardContext";

export default function ProductCheckout() {
    const { cart, address, selectedAdress, setCart, setPlacedOrders } = useContext(GiftCardContext);
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const selectedAddressObj = address?.find((a) => a._id === selectedAdress);

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.giftCardBalance * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="container text-center text-muted py-5">
                <p className="fs-5 mb-3">Your cart is empty</p>
                <Link className="btn btn-outline-dark" to="/">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (!selectedAddressObj) {
        return (
            <div className="container text-center text-muted py-5">
                <p className="fs-5 mb-3">No delivery address selected</p>
                <Link className="btn btn-outline-dark" to="/adresslist">
                    Select Delivery Address
                </Link>
            </div>
        );
    }

    async function handleProceedToPayment() {
        setIsPlacingOrder(true);
        try {
            const response = await fetch("https://viii-major-project-backend.vercel.app/order/UserOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart, totalAmount, address: selectedAddressObj })
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || data.err || "Order failed, please try again");
                setIsPlacingOrder(false);
                return;
            }

            setPlacedOrders((prev) => [...prev, ...cart]);
            setCart([]);
            toast.success("Order placed successfully!");
            navigate("/success");

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong, please try again");
            setIsPlacingOrder(false);
        }
    }

    return (
        <div className="container py-4" style={{ maxWidth: "700px" }}>
            <h3 className="mb-1 fw-semibold">Review Your Order</h3>
            <p className="text-muted small mb-4">Please check everything carefully before you proceed to payment</p>

            {/* Order Items */}
            <div className="card border-0 shadow-sm mb-3" style={{ borderRadius: "12px" }}>
                <div className="card-body p-3">
                    <h6 className="fw-semibold mb-3">
                        Order Items <span className="text-muted fw-normal">({cart.length})</span>
                    </h6>

                    <div className="d-flex flex-column gap-3">
                        {cart.map((item, index) => (
                            <div className="d-flex align-items-center gap-3" key={item._id ?? index}>
                                <img
                                    src={item.giftCardImage}
                                    alt={item.giftCardTitle}
                                    className="rounded bg-light"
                                    style={{ height: "64px", width: "64px", objectFit: "cover", flexShrink: 0 }}
                                />
                                <div className="flex-grow-1">
                                    <p className="mb-0 fw-medium">{item.giftCardTitle}</p>
                                    <p className="mb-0 text-muted small">
                                        ₹{item.giftCardBalance} × {item.quantity}
                                    </p>
                                </div>
                                <p className="mb-0 fw-semibold">
                                    ₹{item.giftCardBalance * item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Delivery Address */}
            <div className="card border-0 shadow-sm mb-3" style={{ borderRadius: "12px" }}>
                <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-semibold mb-0">Delivery Address</h6>
                        <Link to="/adresslist" className="small">
                            Change
                        </Link>
                    </div>
                    <p className="mb-1 small">
                        {selectedAddressObj.fullName} • {selectedAddressObj.mobileNumber}
                    </p>
                    <p className="mb-1 small text-muted">
                        House no {selectedAddressObj.houseNo}
                        {selectedAddressObj.flatOrBuilding && `, ${selectedAddressObj.flatOrBuilding}`}, {selectedAddressObj.locality}
                    </p>
                    <p className="mb-2 small text-muted">
                        {selectedAddressObj.landmark && `Near ${selectedAddressObj.landmark}, `}
                        {selectedAddressObj.district}, {selectedAddressObj.state} - {selectedAddressObj.pincode}
                    </p>
                    <span className="badge bg-dark">{selectedAddressObj.addressType}</span>
                </div>
            </div>

            {/* Price Summary */}
            <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "12px" }}>
                <div className="card-body p-3">
                    <h6 className="fw-semibold mb-3">Price Summary</h6>
                    <div className="d-flex justify-content-between small mb-2">
                        <span className="text-muted">Subtotal</span>
                        <span>₹{totalAmount}</span>
                    </div>
                    <div className="d-flex justify-content-between small mb-2">
                        <span className="text-muted">Delivery</span>
                        <span className="text-success">Free</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-semibold">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2">
                <Link to="/" className="btn btn-outline-secondary flex-grow-1">
                    Back to Cart
                </Link>
                <button
                    className="btn btn-success flex-grow-1"
                    onClick={handleProceedToPayment}
                    disabled={isPlacingOrder}
                >
                    {isPlacingOrder ? "Placing Order..." : "Proceed to Payment"}
                </button>
            </div>
        </div>
    );
}