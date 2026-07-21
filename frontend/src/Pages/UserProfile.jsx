import { useContext } from "react";
import GiftCardContext from "../Context/GiftCardContext";
export default function UserProfile() {
  const { placedOrders,selectedAdress,address } = useContext(GiftCardContext);
    const user = {
        name: "Gourav Sharma",
        email: "gouravsharma20a@gmail.com",
        address: "Sector 4/A, House No. 2090, Vasundhara, Ghaziabad 201012",
    };

    const deliveryInfo = address?.find((a) => a._id === selectedAdress);


    return (
        <>{deliveryInfo  ?    <div className="container py-4" style={{ maxWidth: "500px" }}>
            <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "12px", overflow: "hidden" }}
            >
                <div className="card-body text-center pt-4 pb-3">
                    <div
                        className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                    >
                        {deliveryInfo.fullName.charAt(0)}
                    </div>
                    <h5 className="fw-semibold mb-0">{deliveryInfo.fullName}</h5>
                    <p className="text-muted small mb-0">{deliveryInfo.mobileNumber}</p>
                </div>

                <hr className="m-0" />

                {/* Address */}
                <div className="card-body py-3">
                    <h6 className="text-muted text-uppercase small fw-bold mb-2">
                        Delivery Address
                    </h6>
                    <p className="mb-0">{deliveryInfo.locality} House no : {deliveryInfo.houseNo} {deliveryInfo.flatOrBuilding} near {deliveryInfo.landmark} {deliveryInfo.district} {deliveryInfo.state} {deliveryInfo.pincode}</p>
                </div>

                <hr className="m-0" />

                {/* Order History */}
                <div className="card-body py-3">
                    <h6 className="text-muted text-uppercase small fw-bold mb-3">
                        Order History
                    </h6>
                    {placedOrders.length === 0 ? (
                        <p className="text-muted small mb-0">No orders yet</p>
                    ) : (
                        <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                            {placedOrders.map((order, index) => (
                                <li
                                    key={index}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <span
                                        className="rounded-circle bg-light"
                                        style={{ width: "6px", height: "6px" }}
                                    ></span>
                                    {order.giftCardTitle}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div> :    <div className="container py-4" style={{ maxWidth: "500px" }}>
            <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "12px", overflow: "hidden" }}
            >
                <div className="card-body text-center pt-4 pb-3">
                    <div
                        className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                    >
                        {user.name.charAt(0)}
                    </div>
                    <h5 className="fw-semibold mb-0">{user.name}</h5>
                    <p className="text-muted small mb-0">{user.email}</p>
                </div>

                <hr className="m-0" />

                {/* Address */}
                <div className="card-body py-3">
                    <h6 className="text-muted text-uppercase small fw-bold mb-2">
                        Delivery Address
                    </h6>
                    <p className="mb-0">{user.address}</p>
                </div>

                <hr className="m-0" />

                {/* Order History */}
                <div className="card-body py-3">
                    <h6 className="text-muted text-uppercase small fw-bold mb-3">
                        Order History
                    </h6>
                    {placedOrders.length === 0 ? (
                        <p className="text-muted small mb-0">No orders yet</p>
                    ) : (
                        <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                            {placedOrders.map((order, index) => (
                                <li
                                    key={index}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <span
                                        className="rounded-circle bg-light"
                                        style={{ width: "6px", height: "6px" }}
                                    ></span>
                                    {user.giftCardTitle}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>}</>
        
     
    );
}