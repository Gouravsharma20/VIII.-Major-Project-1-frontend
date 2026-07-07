  import { useContext,useEffect } from "react"

  import BookContext from "../Context/GiftCardContext"

  import { Link } from "react-router-dom"

  export default function Home(){
    const {giftcards,setSelectedCategory,categories,homeSearchResult, homeSearchNotFound,loading} = useContext(BookContext)
    // const category = [...new Set(giftcards.map((card)=>card.giftCardCategory))]
    useEffect(() => {
    setSelectedCategory("")
}, [])

        const listToShow = homeSearchNotFound ? [] : homeSearchResult ?  [homeSearchResult] : categories

        if (loading) {
            return <p>loading categories ... </p>
        }

      return (
          <>
          <h1 style={{ color: "black", fontSize: "50px" }}>Showing All Categories</h1>
          <p>(showing {listToShow.length} category products )</p>

          {homeSearchNotFound && <span className="text-danger ms-2">No category found</span>}


          <ul>{listToShow.map((cat)=>(<li key={cat}style={{ cursor: "pointer" }}><Link to={`/product/${cat}`}>{cat}</Link></li>))}</ul>

          
          </>
      )
  }