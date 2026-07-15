import { useContext } from "react";
import GiftCardContext from "../Context/GiftCardContext";

export default function ViewOrders() {
    const { placedOrders } = useContext(GiftCardContext);

    return (
        <div className="container py-4" style={{ maxWidth: "700px" }}>
            <h3 className="mb-4 fw-semibold">My Orders</h3>

            {placedOrders.length === 0 ? (
                <div className="text-center text-muted py-5">
                    <p className="fs-5 mb-0">No orders placed yet</p>
                    <p className="small">Your placed orders will show up here</p>
                </div>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {placedOrders.map((item, index) => (
                        <div
                            className="card shadow-sm border-0"
                            style={{ borderRadius: "12px", overflow: "hidden" }}
                            key={item._id ?? index}
                        >
                            <div className="row g-0">
                                <div className="col-3 col-md-2 d-flex align-items-center justify-content-center bg-light">
                                    <img
                                        src={item.giftCardImage}
                                        alt={item.giftCardTitle}
                                        className="rounded"
                                        style={{ height: "70px", width: "70px", objectFit: "cover", margin: "10px" }}
                                    />
                                </div>
                                <div className="col-9 col-md-10">
                                    <div className="card-body p-3">
                                        <h5 className="card-title mb-1">{item.giftCardTitle}</h5>
                                        <p className="card-text text-muted small mb-1">
                                            Balance: ₹{item.giftCardBalance}
                                        </p>
                                        {item.quantity && (
                                            <p className="card-text text-muted small mb-0">
                                                Quantity: {item.quantity}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}