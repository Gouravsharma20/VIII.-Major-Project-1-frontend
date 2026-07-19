import { useContext } from "react"
import GiftCardContext from "../Context/GiftCardContext"


export default function AdressList() {
    const {address} = useContext(GiftCardContext)
    if (!address) return null;
    console.log(address);
    return (
        <>
        {address?.fullName && (
    <div className="p-3 mt-3 shadow-sm" style={{ borderRadius: "12px", background: "#f8f9fa" }}>
        <h6 className="fw-semibold mb-2">Delivery Address</h6>
        <p className="mb-1 small">{address.fullName} • {address.mobileNumber}</p>
        <p className="mb-1 small">
            {address.houseNo}, {address.flatOrBuilding && `${address.flatOrBuilding}, `}{address.locality}
        </p>
        <p className="mb-1 small">
            {address.landmark && `Near ${address.landmark}, `}{address.district}, {address.state} - {address.pincode}
        </p>
        <span className="badge bg-dark">{address.addressType}</span>
    </div>
)}
        </>
        
    )
}