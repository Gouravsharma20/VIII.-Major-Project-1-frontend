  import { useContext,useEffect } from "react"

  import BookContext from "../Context/GiftCardContext"

  import { Link } from "react-router-dom"

  export default function Home(){
    const {giftcards,setSelectedCategory} = useContext(BookContext)
    const categories = [...new Set(giftcards.map((card)=>card.giftCardCategory))]
    useEffect(() => {
    setSelectedCategory("")
}, [])
      return (
          <>
          <h1 style={{ color: "black", fontSize: "50px" }}>Showing All Categories</h1>
          <p>(showing {categories.length} category products )</p>

          <ul>{categories.map((cat)=>(<li key={cat}style={{ cursor: "pointer" }}><Link to={`/product/${cat}`}>{cat}</Link></li>))}</ul>

          
          </>
      )
  }