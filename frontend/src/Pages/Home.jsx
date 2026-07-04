import { useEffect, useState } from "react"
// import { data } from "react-router-dom"

export default function Home(){
     const [events,setEvnets] = useState("")
     const [giftcards,setGiftCards] = useState([])
     const [searchedCategory,setSearchedCategory] = useState(null)
     const [selectedCategory,setSelectedCategory] = useState("")
     useEffect(()=>{
        const fetchGiftCards = async () => {
            try {
                let url = "https://viii-major-project-backend.vercel.app/allgiftCards"
            if (selectedCategory) {
                url = `https://viii-major-project-backend.vercel.app/category/${selectedCategory}`
            }
            const response = await fetch(url)
            const data = await response.json()

            const cards = selectedCategory ? data.listOfGiftCards : data.giftCards
            setGiftCards(cards || [])

            } catch(err) {
                console.log("error fecthing gift cards ",err)
                throw err
            }
        }
        fetchGiftCards()
     },[selectedCategory])

    //  const displayGiftCard = searchedCategory ? searchedCategory:events
    return (
        <>
        <h1 style={{ color: "black", fontSize: "50px" }}>Ghar hu mai</h1>
        <h2>ye toh ghr jaisi baat hai</h2>
        <ul>{giftcards.map((e)=>(
            <li key={e._id}>
                <p>{e.giftCardNumber}</p>
                <p>{e.giftCardPin}</p>
            </li>
        ))}</ul>
        </>
    )
}