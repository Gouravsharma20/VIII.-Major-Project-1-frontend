import {useContext,useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom"
import GiftCardContext from "../Context/GiftCardContext"
import wishlistIcon from "../Assets/wishlist.svg"

export default function Products() {
    const {giftcards,setSelectedCategory,searchedCard,searchError,loading,setProductDetail,addToCart,addToWishList,clearSearch} = useContext(GiftCardContext)
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
            <div className="col-md-3 border-end">
              <h5 className="mb-3">Filters</h5>

              <p className="fw-bold mb-2">Sort By Name</p>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="alphabeticalSort" id="atoz" onClick={()=>setSortBy("az")} />
                <label className="form-check-label" htmlFor="atoz">A-Z</label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" name="alphabeticalSort" id="ztoa" onChange={()=>setSortBy("za")} />
                <label className="form-check-label" htmlFor="ztoa">Z-A</label>
              </div>

              <p className="fw-bold mb-2">Rating (Sort By)</p>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ratingSort" id="fourAndAbove" onClick={()=>setRatingFilter("fourAndAbove")} />
                <label className="form-check-label" htmlFor="fourAndAbove">4 Stars & Above</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ratingSort" id="threeAndAbove" onClick={()=>setRatingFilter("threeAndAbove")} />
                <label className="form-check-label" htmlFor="threeAndAbove">3 Stars & Above</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="ratingSort" id="twoAndAbove" onClick={()=>setRatingFilter("twoAndAbove")} />
                <label className="form-check-label" htmlFor="twoAndAbove">2 Stars & Above</label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" name="ratingSort" id="oneAndAbove" onClick={()=>setRatingFilter("oneAndAbove")} />
                <label className="form-check-label" htmlFor="oneAndAbove">1 Stars & Above</label>
              </div>

              <p className="fw-bold mb-2">Price (Sort By)</p>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="priceSort" id="defaultSort" onClick={()=>setSortBy(null)} />
                <label className="form-check-label" htmlFor="defaultSort">Default</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="priceSort" id="lowToHigh" onClick={()=>setSortBy("lowToHigh")} />
                <label className="form-check-label" htmlFor="lowToHigh">Price: Low to High</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="priceSort" id="highToLow" onClick={()=>setSortBy("highToLow")} />
                <label className="form-check-label" htmlFor="highToLow">Price: High to Low</label>
              </div>
            </div>

            {/* RIGHT SIDE - GIFT CARDS GRID */}
            <div className="col-md-9">
              {searchError && <p className="text-danger">{searchError}</p>}

              <div className="row">
                {cardsToShow.map((card)=>(
                  <div className="col-md-4 mb-4" key={card._id}>
                    <div className="card h-100">
                      <img
                        src={card.giftCardImage}
                        alt={card.giftCardTitle}
                        className="rounded mx-auto d-block mt-3"
                        style={{ height: "150px", width: "150px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <img
                          className="float-end img-fluid"
                          src={wishlistIcon}
                          width="24"
                          height="24"
                          style={{cursor:"pointer"}}
                          onClick={()=>addToWishListHandler(card)}
                        />
                        <h5 className="card-title">{card.giftCardTitle}</h5>
                        <p className="card-text">Price : {card.giftCardBalance}</p>
                        <p className="card-text">Rating : {card.giftCardRating}</p>
                        <p className="card-text">Term and conditions : {card.redemptionTerms}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Expiry Date : {card.giftCardexpiryDate}
                          </small>
                        </p>
                        <button className="btn btn-success mb-2" onClick={()=>addToCardHandler(card)}>Add to Cart</button>
                        <button className="btn btn-info" onClick={()=>showProductDetailsHandler(card)}>Show Product details</button>
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