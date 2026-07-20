import { useContext } from "react"
import GiftCardContext from "../Context/GiftCardContext"
import {Link } from "react-router-dom";

import deleteIcon from "../Assets/delete.svg"


export default function AdressList() {
    const { address, loading, selectedAdress, selectAddress,removeAdress } = useContext(GiftCardContext)

    if (!address || address.length === 0) return null;

    return (
        <>
            {address.map((addr) => (
                <div
                    key={addr._id}
                    className="p-3 mt-3 shadow-sm position-relative"
                    style={{
                        borderRadius: "12px",
                        background: selectedAdress === addr._id ? "#f1f3f5" : "#f8f9fa",
                        border: selectedAdress === addr._id ? "2px solid #212529" : "1px solid transparent",
                        transition: "all 0.2s ease",
                    }}
                >
                    <h6 className="fw-semibold mb-2">Delivery Address</h6>
                    <p className="mb-1 small">{addr.fullName} • {addr.mobileNumber}</p>
                    <p className="mb-1 small">
                        {addr.houseNo}, {addr.flatOrBuilding && `${addr.flatOrBuilding}, `}{addr.locality}
                    </p>
                    <p className="mb-1 small">
                        {addr.landmark && `Near ${addr.landmark}, `}{addr.district}, {addr.state} - {addr.pincode}
                    </p>
                    <Link to={"/productCheckout"}
                        className={`btn btn-sm mt-2 ${selectedAdress === addr._id ? "btn-dark" : "btn-outline-dark"}`}
                        style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.6 : 1 }}
                        disabled={loading}
                        onClick={() => {selectAddress(addr._id)}}
                        
                    >
                        {loading
                            ? "selecting ..."
                            : selectedAdress === addr._id
                                ? "Selected"
                                : "Select address"}
                    </Link>
                    <img src={deleteIcon}
                    alt="delete"
                    className="position-absolute"
                    width="38"
                    height="38"
                    style={{ top: "18px",right: "24px",cursor: "pointer", opacity: 0.6, transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
                    onClick={()=>removeAdress(addr._id)}/>
                    
                </div>
                
            ))}
            <div className="text-center mt-3">
                <Link className="btn btn-dark btn-sm px-4 py-2" to={"/adress"} style={{ borderRadius: "8px" }}>
                + Add New Address
                </Link>
            </div>
        </>
    )
}