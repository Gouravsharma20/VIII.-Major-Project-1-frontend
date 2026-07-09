import { useContext,useState } from "react";

import { Link,useLocation } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import GiftCardContext from "../Context/GiftCardContext";


export default function Navigation(){

  const {cart,wishList, searchGiftCardByTitle,searchCategory} = useContext(GiftCardContext)
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

  const totalCartQuantity = cart.reduce((total,item)=>total+item.quantity,0)

  


    return (
        <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <Link to = "/" className="navbar-brand">GiftMart</Link>
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

    



    {/* <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Wishlist ({wishList.length})
    </a> */}

    <Link className="btn btn-primary" to={"/wishlist"}>Wishlist ({wishList.length})</Link>

    {/* <ul className="dropdown-menu">
      {wishList.length === 0 ? (
        <li>
          <span className="dropdown-item">
            No item is available in wishlist
          </span>
        </li>
      ) : (
        <Link to={"/wishlist"}>Go to Wishlist</Link>
      )}
    </ul> */}

  {/* </li> */}


  




    <Link to = "/login" className="nav-link ms-1 btn-btn-primary">login</Link>
    {/* <Link to = "/cart" className="nav-link ms-3">Cart</Link> */}
    {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cart ({totalCartQuantity})
          </a>
          <ul className="dropdown-menu">
            {cart.length === 0 ? (
    <li><span className="dropdown-item">Cart is empty</span></li>
) : (
  <Link to={"/cart"}>Go to Cart</Link>
    // <CartItems/>
)}
          </ul>
        </li> */}

        <Link className="btn btn-primary" to={"/cart"}> Cart ({totalCartQuantity})</Link>
  </div>
</nav>  
    )
}


