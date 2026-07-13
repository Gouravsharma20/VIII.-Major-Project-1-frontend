import { useContext } from "react";

import GiftCardContext from "../Context/GiftCardContext"

async function SaveAdress(e) {
  e.preventDefault()

  // try {


  // } catch(err) {
  //   console.log(err)
  // }

  
}

export default function AdressPage() {
    const {loading} = useContext(GiftCardContext)
  return (
    <form onSubmit={SaveAdress}>
      {/* Full Name */}
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full Name
        </label>

        <input
          type="text"
          className="form-control"
          id="fullName"
          aria-describedby="fullNameHelp"
        />

        <div id="fullNameHelp" className="form-text">
          Write your full name here
        </div>
      </div>

      {/* Mobile Number */}
      <div className="mb-3">
        <label htmlFor="mobileNumber" className="form-label">
          Mobile Number
        </label>

        <input
          type="tel"
          className="form-control"
          id="mobileNumber"
          aria-describedby="mobileNumberHelp"
        />

        <div id="mobileNumberHelp" className="form-text">
          Write your mobile number here
        </div>
      </div>

      {/* Pincode */}
      <div className="mb-3">
        <label htmlFor="pincode" className="form-label">
          Pincode
        </label>

        <input
          type="text"
          className="form-control"
          id="pincode"
          aria-describedby="pincodeHelp"
        />

        <div id="pincodeHelp" className="form-text">
          Write your pincode here
        </div>
      </div>

      {/* Locality */}
      <div className="mb-3">
        <label htmlFor="locality" className="form-label">
          Locality
        </label>

        <input
          type="text"
          className="form-control"
          id="locality"
          aria-describedby="localityHelp"
        />

        <div id="localityHelp" className="form-text">
          Locality / Address / Street
        </div>
      </div>

      {/* House Number */}
      <div className="mb-3">
        <label htmlFor="houseNumber" className="form-label">
          House No.
        </label>

        <input
          type="text"
          className="form-control"
          id="houseNumber"
          aria-describedby="houseNumberHelp"
        />

        <div id="houseNumberHelp" className="form-text">
          Write your flat number or building name here
        </div>
      </div>

      {/* Landmark */}
      <div className="mb-3">
        <label htmlFor="landmark" className="form-label">
          Landmark
        </label>

        <input
          type="text"
          className="form-control"
          id="landmark"
          aria-describedby="landmarkHelp"
        />

        <div id="landmarkHelp" className="form-text">
          Write a nearby landmark
        </div>
      </div>

      {/* District */}
      <div className="mb-3">
        <label htmlFor="district" className="form-label">
          District
        </label>

        <input
          type="text"
          className="form-control"
          id="district"
          aria-describedby="districtHelp"
        />

        <div id="districtHelp" className="form-text">
          District / City
        </div>
      </div>

      {/* State */}
      <div className="mb-3">
        <label htmlFor="state" className="form-label">
          State
        </label>

        <input
          type="text"
          className="form-control"
          id="state"
          aria-describedby="stateHelp"
        />

        <div id="stateHelp" className="form-text">
          Write your state
        </div>
      </div>

        <h5 className="fw-bold mb-4">Address Type</h5>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="addressType"
              id="home"
              value="Home"
              defaultChecked
            />

            <label className="form-check-label fs-5" htmlFor="home">
              Home
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="addressType"
              id="work"
              value="Work"
            />

            <label className="form-check-label fs-5" htmlFor="work">
              Work
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="addressType"
              id="others"
              value="Others"
            />

            <label className="form-check-label fs-5" htmlFor="others">
              Others
            </label>
          </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        Save Address
      </button>
    </form>
  );
}