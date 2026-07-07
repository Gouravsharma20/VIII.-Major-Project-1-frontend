import { useContext,useState } from "react";

import { Link,useLocation } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import BookContext from "../Context/GiftCardContext";

// import {categories} from "../Pages/Home.jsx"


// import Wishlist from "../Pages/Wishlist"

export default function Navigation(){

  const {cart,wishList,categories, searchGiftCardByTitle,searchCategory} = useContext(BookContext)
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

  


    return (
        <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <Link to = "/" className="navbar-brand">GiftMart</Link>
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

    



    <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Wishlist ({wishList.length})
    </a>

    <ul className="dropdown-menu">
      {wishList.length === 0 ? (
        <li>
          <span className="dropdown-item">
            No item is available in wishlist
          </span>
        </li>
      ) : (
        wishList.map((listItem, index) => (
          <li key={index}>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={listItem.giftCardImage}
                    className="img-fluid rounded-start"
                    alt="Gift Card"
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      Gift Card
                    </h5>

                    <p className="card-text">
                      {listItem.redemptionTerms}
                    </p>

                    <p className="card-text">
                      <small className="text-body-secondary">
                        {listItem.redemptionType}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>

  </li>


  




    <Link to = "/login" className="nav-link ms-1 btn-btn-primary">login</Link>
    {/* <Link to = "/cart" className="nav-link ms-3">Cart</Link> */}
    <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cart ({cart.length})
          </a>
          <ul className="dropdown-menu">
            {cart.length === 0 ? (
    <li><span className="dropdown-item">Cart is empty</span></li>
) : (
    cart.map((item,index) => (
      <li key={index}>
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img
        src={item.giftCardImage}
        className="img-fluid rounded-start"
        alt="..."
      />
    </div>

    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{item.giftCardTitle}</h5>

        <p className="card-text">
          {item.redemptionTerms}
        </p>

        <p className="card-text">
          <small className="text-body-secondary">
            {item.redemptionType}
          </small>
        </p>
      </div>
    </div>
  </div>
</div>

      </li>
      
    ))
)}
          </ul>
        </li>
  </div>
</nav>  
    )
}


