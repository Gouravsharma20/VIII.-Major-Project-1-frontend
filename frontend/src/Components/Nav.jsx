import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GiftCardContext from "../Context/GiftCardContext";
import profile from '../Assets/profile.svg'
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate()

  const { cart, wishList, searchGiftCardByTitle, searchCategory } = useContext(GiftCardContext)
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()

  async function handleSearch(e) {
    e.preventDefault()
    if (location.pathname === "/") {
      searchCategory(searchTerm)
    } else {
      await searchGiftCardByTitle(searchTerm)
    }
  }

  const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center">

        {/* Left: Brand */}
        <Link to="/" className="navbar-brand flex-shrink-0">GiftMart</Link>

        {/* Center: Search */}
        <form
          className="d-flex mx-auto"
          role="search"
          onSubmit={handleSearch}
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by category"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        {/* Right: Actions */}
        <div className="d-flex align-items-center flex-shrink-0 gap-2">
          <Link className="btn btn-primary" to={"/wishlist"}>Wishlist ({wishList.length})</Link>

          <img
            src={profile}
            alt="profile"
            onClick={() => navigate("/profile")}
            style={{
              width: "35px",
              height: "35px",
              cursor: "pointer"
            }}
          />

          <Link className="btn btn-primary" to={"/cart"}>Cart ({totalCartQuantity})</Link>
        </div>

      </div>
    </nav>
  )
}