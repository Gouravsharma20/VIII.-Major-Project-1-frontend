import { useContext } from "react";

import GiftCardContext from "../Context/GiftCardContext"



export default function ViewOrders() {
    const {cart} = useContext(GiftCardContext)
    return (
        <div>
        <h1>List of placed orders</h1>
        <ul>{cart.map((item)=>{
            return (
                <li>{item.giftCardTitle}</li>  
            )
        })}</ul>
        
        </div>
    )
}