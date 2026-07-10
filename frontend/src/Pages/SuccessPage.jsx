import { Link } from "react-router-dom";

export default function SuccessPage() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{ minHeight: "80vh" }}
        >
            <div
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                }}
            >
                <span style={{ color: "white", fontSize: "40px" }}>✓</span>
            </div>

            <h2 className="mb-2">Product Bought Successfully!</h2>
            <p className="text-muted mb-4">
                Thank you for your purchase. Your gift card is on its way.
            </p>

            <div>
                <Link to="/" className="btn btn-primary me-2">
                    Continue Shopping
                </Link>
                <Link to="/viewOrders" className="btn btn-outline-secondary">
                    View Orders
                </Link>
            </div>
        </div>
    );
}