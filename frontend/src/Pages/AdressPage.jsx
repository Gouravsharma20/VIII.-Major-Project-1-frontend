import { useContext, useState } from "react";
import GiftCardContext from "../Context/GiftCardContext";

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

const initialAdress = {
  fullName: "",
  mobileNumber: "",
  locality: "",
  houseNo: "",
  flatOrBuilding: "",
  landmark: "",
  pincode: "",
  district: "",
  state: "",
  addressType: "Home",
  isDefault: false,
}

export default function AdressPage() {
  const {addAddress,loading,user} = useContext(GiftCardContext);

  const [draft,setDraft] = useState(initialAdress)

  const navigate = useNavigate()

  

  

  function handleChange(e) {
    const { id, value } = e.target;
    setDraft((prev) => ({ ...prev, [id]: value }));
  }

  async function SaveAdress(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://viii-major-project-backend.vercel.app/user/${user._id}/newAdress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Failed to save address:", data.error || data.err);
        toast.error("Failed to save address");
        return;
      }

      const backendAddress = data.addedAdress?.addresses?.at(-1) || draft
      const savedAddress = { ...backendAddress, _id: backendAddress._id };


      // const backendAddress = data.newAddress || data.address || draft
      // const savedAddress = {
      //   ...backendAddress,
      //   _id: backendAddress._id || crypto.randomUUID()
      // };

      addAddress(savedAddress)
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again");
      return
    }

    toast.success("adress saved to database successfully")



    navigate("/productCheckout");

    console.log("Address to save:", draft);
    
  }

  return (
    <div className="container py-4" style={{ maxWidth: "650px" }}>
      <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "12px" }}>
        <h3 className="fw-semibold mb-4">Delivery Address</h3>

        <form onSubmit={SaveAdress}>
          {/* Contact Info */}
          <h6 className="text-muted text-uppercase small fw-bold mb-3">Contact Details</h6>
          <div className="row mb-3">
            <div className="col-md-7 mb-3 mb-md-0">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value ={draft.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                value={draft.mobileNumber}
                onChange={handleChange}
                placeholder="10-digit number"
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* Address Info */}
          <h6 className="text-muted text-uppercase small fw-bold mb-3">Address</h6>

          <div className="mb-3">
            <label htmlFor="locality" className="form-label">Locality</label>
            <input
              type="text"
              className="form-control"
              id="locality"
              value={draft.locality}
              onChange={handleChange}
              placeholder="Locality / Address / Street"
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="houseNumber" className="form-label">House No.</label>
              <input
                type="text"
                className="form-control"
                id="houseNo"
                value={draft.houseNo}
                onChange={handleChange}
                placeholder="Flat / building name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="landmark" className="form-label">Landmark</label>
              <input
                type="text"
                className="form-control"
                id="landmark"
                value={draft.landmark}
                onChange={handleChange}
                placeholder="Nearby landmark (optional)"
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4 mb-3 mb-md-0">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                value={draft.pincode}
                onChange={handleChange}
                placeholder="e.g. 201001"
              />
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <label htmlFor="district" className="form-label">District</label>
              <input
                type="text"
                className="form-control"
                id="district"
                value={draft.district}
                onChange={handleChange}
                placeholder="District / City"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                value={draft.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* Address Type */}
          <h6 className="text-muted text-uppercase small fw-bold mb-3">Address Type</h6>
          <div className="d-flex gap-4 mb-4">
            {["Home", "Work", "Others"].map((type) => (
              <div className="form-check" key={type}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressType"
                  id={type.toLowerCase()}
                  value={type}
                  checked={draft.addressType === type}
                  onChange={() => setDraft((prev) => ({ ...prev, addressType: type }))}
                />
                <label className="form-check-label" htmlFor={type.toLowerCase()}>
                  {type}
                </label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2" disabled={loading}>
            {loading ? "Saving..." : "Save Address"}
          </button>
          
        </form>
        
      </div>
    </div>
  );
}