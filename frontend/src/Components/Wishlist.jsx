import { useContext } from "react"
import GiftCardContext from "../Context/GiftCardContext"

import deleteIcon from "../Assets/delete.svg"

import { useNavigate } from "react-router-dom"

export default function Wishlist(){
    const {productDetail, wishList, removeFromWishList, setProductDetail, addToCart } = useContext(GiftCardContext)

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
        <div className="container py-4">
            <h3 className="mb-4 fw-semibold">My Wishlist</h3>

            {wishList.length === 0 ? (
                <div className="text-center text-muted py-5">
                    <p className="fs-5 mb-0">Your wishlist is empty</p>
                    <p className="small">Items you save will show up here</p>
                </div>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {wishList.map((item, index) => (
                        <div
                            className="card shadow-sm border-0"
                            style={{ maxWidth: "600px", borderRadius: "12px", overflow: "hidden" }}
                            key={item._id ?? index}
                        >
                            <div className="row g-0">
                                <div className="col-4 col-md-3">
                                    <img
                                        src={item.giftCardImage}
                                        className="img-fluid h-100"
                                        style={{ objectFit: "cover" }}
                                        alt={item.giftCardTitle}
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

                                        <h5 className="card-title mb-1 pe-4">{item.giftCardTitle}</h5>
                                        <p className="card-text text-muted small mb-3">
                                            Redeemable: {item.redemptionType}
                                        </p>

                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => showProductDetailsHandler(item)}
                                            >
                                                View Details
                                            </button>
                                            <button
                                                className="btn btn-dark btn-sm"
                                                onClick={() => addToCardHandler(item)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}