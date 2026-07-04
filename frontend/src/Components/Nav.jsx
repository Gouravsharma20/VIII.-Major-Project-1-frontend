import { Link } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/js/bootstrap.bundle.min.js";


import Wishlist from "../Pages/Wishlist"

export default function Navigation(){
    return (
        <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <Link to = "/" class="navbar-brand">GiftMart</Link>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    <Link to = "/wishlist" className="nav-link ms-3">Wishlist</Link>
    <Link to = "/login" className="nav-link ms-1 btn-btn-primary">login</Link>
    {/* <Link to = "/cart" className="nav-link ms-3">Cart</Link> */}
    <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cart
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
  </div>
</nav>  
    )
}
