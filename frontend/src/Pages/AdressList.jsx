import { useContext, useState } from "react"
import GiftCardContext from "../Context/GiftCardContext"
import {Link } from "react-router-dom";

import deleteIcon from "../Assets/delete.svg"


export default function AdressList() {
    const { address,setAddress, loading, selectedAdress, selectAddress,removeAdress,editAdress,user } = useContext(GiftCardContext)

    const [editingId,setEditingId] = useState(null)
    const [formData,setFormData] = useState({})
    const [saving,setSaving] = useState(false)

    if (!address || address.length === 0) return null;

    function startEdit(addr){
        setEditingId(addr._id)
        setFormData({
            fullName: addr.fullName,
            mobileNumber: addr.mobileNumber,
            pincode: addr.pincode,
            locality: addr.locality,
            houseNo: addr.houseNo,
            flatOrBuilding: addr.flatOrBuilding || "",
            landmark: addr.landmark || "",
            district: addr.district,
            state: addr.state,
        })
    }

    function cancelEdit(){
        setEditingId(null)
        setFormData({})
    }

    function handleChange(e){
        const {name,value} = e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }

    async function saveEdit(addr) {
        try {
            setSaving(true)
            // const userId = "6a51ed5b39587a2d83b6b59b"

            // const result = await editAdress(userId, {
            //     addressId: addr._id,
            //     ...formData,
            // })

            await editAdress(user._id, {
                addressId: addr._id,
                ...formData,
            })

            setAddress((prev) =>
                prev.map((a) => (a._id === addr._id ? { ...a, ...formData } : a))
            )

            setEditingId(null)
            setFormData({})

        } catch(err) {
            console.log("Failed to save address edit",err)
        } finally {
            setSaving(false)
        }
        
    }

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


                    {editingId === addr._id ? (
                        <div className="d-flex flex-column gap-2">
                            <h6 className="fw-semibold mb-2">Edit Address</h6>
                            <input className="form-control form-control-sm" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full name" />
                            <input className="form-control form-control-sm" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile number" />
                            <input className="form-control form-control-sm" name="houseNo" value={formData.houseNo} onChange={handleChange} placeholder="House no." />
                            <input className="form-control form-control-sm" name="flatOrBuilding" value={formData.flatOrBuilding} onChange={handleChange} placeholder="Flat / Building" />
                            <input className="form-control form-control-sm" name="locality" value={formData.locality} onChange={handleChange} placeholder="Locality" />
                            <input className="form-control form-control-sm" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark" />
                            <input className="form-control form-control-sm" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
                            <input className="form-control form-control-sm" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                            <input className="form-control form-control-sm" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />

                            <div className="d-flex gap-2 mt-2">
                                <button className="btn btn-dark btn-sm" disabled={saving} onClick={() => saveEdit(addr)}>
                                    {saving ? "Saving..." : "Save"}
                                </button>
                                <button className="btn btn-outline-secondary btn-sm" disabled={saving} onClick={cancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ):(<>
                      <h6 className="fw-semibold mb-2">Delivery Address</h6>
                    <p className="mb-1 small">{addr.fullName} • {addr.mobileNumber}</p>
                    <p className="mb-1 small">
                        {addr.houseNo}, {addr.flatOrBuilding && `${addr.flatOrBuilding}, `}{addr.locality}
                    </p>
                    <p className="mb-1 small">
                        {addr.landmark && `Near ${addr.landmark}, `}{addr.district}, {addr.state} - {addr.pincode}
                    </p>
                    {<Link to={"/productCheckout"}
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
                    </Link>}
                    {/* {removeAdress(addr._id)} */}
                    <img src={deleteIcon}
                    alt="delete"
                    className="position-absolute"
                    width="38"
                    height="38"
                    style={{ top: "18px",right: "24px",cursor: "pointer", opacity: 0.6, transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
                    onClick={()=>removeAdress(addr._id)}/>

                    <button className="btn btn-sm btn-outline-dark mt-2 ms-2" onClick={()=>{startEdit(addr)}}>edit adress</button>
                    </>)}
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