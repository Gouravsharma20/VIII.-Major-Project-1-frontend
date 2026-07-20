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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">

        {/* Brand */}
        <Link to="/" className="navbar-brand flex-shrink-0">GiftMart</Link>

        {/* Mobile-only quick actions (always visible, no need to open menu) */}
        <div className="d-flex d-lg-none align-items-center gap-2 order-lg-3">
          <Link className="btn btn-primary btn-sm position-relative" to={"/wishlist"}>
            ♥
            {wishList.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishList.length}
              </span>
            )}
          </Link>

          <Link className="btn btn-primary btn-sm position-relative" to={"/cart"}>
            🛒
            {totalCartQuantity > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalCartQuantity}
              </span>
            )}
          </Link>

          <img
            src={profile}
            alt="profile"
            onClick={() => navigate("/profile")}
            style={{ width: "32px", height: "32px", cursor: "pointer" }}
          />

          {/* Toggler for search (collapse) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle search"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Collapsible content: search (mobile) + full right side (desktop) */}
        <div className="collapse navbar-collapse order-lg-2" id="navbarContent">

          {/* Search */}
          <form
            className="d-flex mx-auto my-2 my-lg-0"
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

          {/* Desktop-only actions (hidden on mobile since they're shown above) */}
          <div className="d-none d-lg-flex align-items-center flex-shrink-0 gap-2 ms-2">
            <Link className="btn btn-primary" to={"/wishlist"}>Wishlist ({wishList.length})</Link>

            <img
              src={profile}
              alt="profile"
              onClick={() => navigate("/profile")}
              style={{ width: "35px", height: "35px", cursor: "pointer" }}
            />

            <Link className="btn btn-primary" to={"/cart"}>Cart ({totalCartQuantity})</Link>
          </div>
        </div>

      </div>
    </nav>
  )
}