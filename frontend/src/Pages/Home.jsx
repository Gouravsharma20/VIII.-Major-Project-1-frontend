import { useContext, useEffect } from "react"
import BookContext from "../Context/GiftCardContext"
import { Link } from "react-router-dom"
import "./Home.css"

export default function Home() {
  const {
    giftcards, setSelectedCategory, categories,
    homeSearchResult, homeSearchNotFound, loading, clearSearch
  } = useContext(BookContext)

  useEffect(() => {
    setSelectedCategory("")
    clearSearch()
  }, [setSelectedCategory, clearSearch])

  const listToShow = homeSearchNotFound ? [] : homeSearchResult ? [homeSearchResult] : categories

  if (loading) {
    return (
      <div className="gc-loading">
        <span className="gc-loading-dot" />
        <p>Fetching categories…</p>
      </div>
    )
  }

  return (
    <div className="gc-home">



      <div className="giftmart-banner mb-4">
      <div className="giftmart-banner-text">
        <h2>Gift Cards for Every Occasion</h2>
        <p>Instant delivery. Zero hassle. Pick a card, make someone's day.</p>
      </div>
    </div>



    {giftcards.length > 0 && (
      <div className="featured-section mb-4">
        <h5 className="featured-title">Featured Gift Cards</h5>
        <div className="featured-scroll">
          {giftcards.map((card) => (
            <div className="featured-card" key={card._id}>
              <img src={card.giftCardImage} alt={card.giftCardTitle} />
              <p className="text-truncate">{card.giftCardTitle}</p>
              <p className="featured-price">₹{card.giftCardBalance}</p>
            </div>
          ))}
        </div>
      </div>
    )}
      <header className="gc-hero">
        <h1 className="gc-title">All Categories</h1>
        <p className="gc-subtitle">
          {listToShow.length} {listToShow.length === 1 ? "category" : "categories"} ready to gift
        </p>
      </header>

      {homeSearchNotFound && (
        <div className="gc-empty">
          <span className="gc-empty-icon">✦</span>
          <p>No category matches that search. Try another name.</p>
        </div>
      )}

      <ul className="gc-grid">
  {listToShow.map((cat, i) => (
    <li
      key={cat}
      className="gc-card h-100"
      style={{ "--tint": `var(--gc-accent-${(i % 4) + 1})` }}
    >
      <Link
        to={`/product/${cat}`}
        className="gc-card-link h-100 d-flex justify-content-center align-items-center"
      >
        <span className="gc-card-fold" />

        <span>
          <span className="gc-card-label">{cat}</span>
          <span className="gc-card-cta"> Shop now →</span>
        </span>
      </Link>
    </li>
  ))}
</ul>
    </div>
  )
}