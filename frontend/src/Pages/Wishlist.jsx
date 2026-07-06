// import {wishList,setWishList} from "../Context/GiftCardContext"


// export default function Wishlist(){
//     return (
//         <>
//         <h2>mai toh wishlist hu</h2>
//         </>
//     )
// }

import { useContext } from "react"
import BookContext from "../Context/GiftCardContext"

export default function Wishlist(){
    const { wishList } = useContext(BookContext)

    return (
        <>
        <h2>mai toh wishlist hu</h2>
        {wishList.length === 0 ? (
            <p>No items in wishlist</p>
        ) : (
            wishList.map((item, index) => (
                <div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={item.giftCardImage}
                                className="img-fluid rounded-start"
                                alt={item.giftCardCategory}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{item.giftCardCategory}</h5>
                                <p className="card-text">{item.redemptionTerms}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}
        </>
    )
}