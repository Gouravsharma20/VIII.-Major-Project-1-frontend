//   import { useContext,useEffect } from "react"

//   import BookContext from "../Context/GiftCardContext"

//   import { Link } from "react-router-dom"

//   import "./Home.css"

//   export default function Home(){
//     const {giftcards,setSelectedCategory,categories,homeSearchResult, homeSearchNotFound,loading,clearSearch} = useContext(BookContext)
//     // const category = [...new Set(giftcards.map((card)=>card.giftCardCategory))]
//     useEffect(() => {
//     setSelectedCategory("")
//     clearSearch()
// }, [setSelectedCategory, clearSearch])

//         const listToShow = homeSearchNotFound ? [] : homeSearchResult ?  [homeSearchResult] : categories

//         if (loading) {
//             return <p>loading categories ... </p>
//         }

//       return (
//           <>
//           <h1 style={{ color: "black", fontSize: "50px" }}>Showing All Categories</h1>
//           <p>(showing {listToShow.length} category products )</p>

//           {homeSearchNotFound && <span className="text-danger ms-2">No category found</span>}


//           <ul>{listToShow.map((cat)=>(<li key={cat}style={{ cursor: "pointer" }}><Link to={`/product/${cat}`}>{cat}</Link></li>))}</ul>

          
//           </>
//       )
//   }


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
          <li key={cat} className="gc-card" style={{ "--tint": `var(--gc-accent-${(i % 4) + 1})` }}>
            <Link to={`/product/${cat}`} className="gc-card-link">
              <span className="gc-card-fold" />
              <span className="gc-card-label">{cat}</span>
              <span className="gc-card-cta">Shop now →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}