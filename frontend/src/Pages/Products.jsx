import {useContext,useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom"
import GiftCardContext from "../Context/GiftCardContext"
import wishlistIcon from "../Assets/wishlist.svg"

import "./Product.css"

export default function Products() {
    const {giftcards,setSelectedCategory,searchedCard,searchError,loading,setProductDetail,addToCart,addToWishList,clearSearch,allCategories} = useContext(GiftCardContext)
    const [sortBy,setSortBy] = useState(null)
    const [ratingFilter, setRatingFilter] = useState(null);
    const {category} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
      setSelectedCategory(category)
      clearSearch()
    },[category])

    function addToCardHandler(card) {
        addToCart(card)
    }

    function addToWishListHandler(card) {
      addToWishList(card)
    }

    function showProductDetailsHandler(card) {
      setProductDetail(card)
      navigate("/productDetails")
    }

    function selectCategoryHandler(cat) {
  navigate(`/product/${cat}`)
}

    const baseCards = searchedCard ? searchedCard : giftcards
    let cardsToShow = [...baseCards];

    if (ratingFilter === "fourAndAbove") {
      cardsToShow = cardsToShow.filter(card=>card.giftCardRating >=4)
    }
    if (ratingFilter === "threeAndAbove") {
      cardsToShow = cardsToShow.filter(card=>card.giftCardRating >=3)
    }
    if (ratingFilter === "twoAndAbove") {
      cardsToShow = cardsToShow.filter(card=>card.giftCardRating >=2)
    }
    if (ratingFilter === "oneAndAbove") {
      cardsToShow = cardsToShow.filter(card=>card.giftCardRating >=1)
    }

    cardsToShow.sort((a,b)=>{
      if (sortBy ==="az") return a.giftCardTitle.localeCompare(b.giftCardTitle)
      if (sortBy ==="za") return b.giftCardTitle.localeCompare(a.giftCardTitle)
      if (sortBy === "lowToHigh") return a.giftCardBalance - b.giftCardBalance
      if (sortBy === "highToLow") return b.giftCardBalance - a.giftCardBalance
      return 0
    });

    if (loading) {
      return <p>Loading gift cards ...</p>
    }

    return (
        <div className="container-fluid pt-3">
          <div className="row">

            {/* LEFT SIDEBAR - FILTERS */}
            <div className="col-md-3 filters-sidebar">
              <div className="filters-header">
                <h5>Filters</h5>
                <button className="filters-clear" onClick={()=>{ setSortBy(null); setRatingFilter(null) }}>Clear</button>
              </div>

              <div className="filter-options">

                <div className="filter-section">
                  <p className="filter-section-title">Reset</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="defaultreset" id="defaultreset" checked={sortBy === null && ratingFilter === null} onChange={()=>{ setSortBy(null); setRatingFilter(null) }} />
                    <label className="form-check-label" htmlFor="defaultreset">Reset to Default</label>
                  </div>
                </div>

                <div className="filter-section">
                  <p className="filter-section-title">Sort By Name</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="alphabeticalSort" id="atoz" checked={sortBy === "az"} onChange={()=>setSortBy("az")} />
                    <label className="form-check-label" htmlFor="atoz">A-Z</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="alphabeticalSort" id="ztoa" checked={sortBy === "za"} onChange={()=>setSortBy("za")} />
                    <label className="form-check-label" htmlFor="ztoa">Z-A</label>
                  </div>
                </div>

                <div className="filter-section">
                  <p className="filter-section-title">Rating (Sort By)</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="ratingSort" id="fourAndAbove" checked={ratingFilter === "fourAndAbove"} onClick={()=>setRatingFilter("fourAndAbove")} />
                    <label className="form-check-label" htmlFor="fourAndAbove">4 Stars & Above</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="ratingSort" id="threeAndAbove" checked={ratingFilter === "threeAndAbove"} onClick={()=>setRatingFilter("threeAndAbove")} />
                    <label className="form-check-label" htmlFor="threeAndAbove">3 Stars & Above</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="ratingSort" id="twoAndAbove" checked={ratingFilter === "twoAndAbove"} onClick={()=>setRatingFilter("twoAndAbove")} />
                    <label className="form-check-label" htmlFor="twoAndAbove">2 Stars & Above</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="ratingSort" id="oneAndAbove" checked={ratingFilter === "oneAndAbove"} onClick={()=>setRatingFilter("oneAndAbove")} />
                    <label className="form-check-label" htmlFor="oneAndAbove">1 Stars & Above</label>
                  </div>
                </div>

                <div className="filter-section">
                  <p className="filter-section-title">Price (Sort By)</p>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="priceSort" id="defaultSort" checked={sortBy === "defaultSort"} onClick={()=>setSortBy(null)} />
                    <label className="form-check-label" htmlFor="defaultSort">Default</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="priceSort" id="lowToHigh" checked={sortBy === "lowToHigh"} onClick={()=>setSortBy("lowToHigh")} />
                    <label className="form-check-label" htmlFor="lowToHigh">Price: Low to High</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="priceSort" id="highToLow" checked={sortBy === "highToLow"} onClick={()=>setSortBy("highToLow")} />
                    <label className="form-check-label" htmlFor="highToLow">Price: High to Low</label>
                  </div>
                </div>


                <div className="filter-section">
                  <p className="filter-section-title">Filter By Category</p>

                  {allCategories && allCategories.map((cat)=>{
                    return (
                      <div className="form-check" key={cat}>
                    <input className="form-check-input" type="radio" name="categorySort" id={cat} checked={category === cat} onClick={()=>selectCategoryHandler(cat)} />
                    <label className="form-check-label" htmlFor="lowToHigh">{cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
                  </div>
                    )
                  })}

                  
                </div>


              </div>
            </div>

            {/* RIGHT SIDE - GIFT CARDS GRID */}
            <div className="col-md-9">
              {searchError && <p className="text-danger">{searchError}</p>}

              <p className="products-header">
                Showing All Products
                <span className="products-count">({cardsToShow.length} products)</span>
              </p>

              <div className="row">
                {cardsToShow.map((card)=>(
                  <div className="col-md-3 mb-4" key={card._id}>
                    <div className="product-card">
                      <div className="product-card-image-wrap">
                        <img src={card.giftCardImage} alt={card.giftCardTitle} />
                        <button className="wishlist-btn" onClick={()=>addToWishListHandler(card)}>
                          <img src={wishlistIcon} alt="wishlist" />
                        </button>
                      </div>
                      <p className="product-card-title text-truncate">{card.giftCardTitle}</p>
                      <p className="product-card-price">₹{card.giftCardBalance}</p>
                      <p className="card-text">Rating : {card.giftCardRating}</p>
                      <div className="product-card-actions">
                        <button className="btn-add-to-cart" onClick={()=>addToCardHandler(card)}>Add to Cart</button>
                        <button className="btn-view-details" onClick={()=>showProductDetailsHandler(card)}>View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
    )
}