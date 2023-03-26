import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import "./Checkout.css"
export default function Checkout() {
    
    return(
        <div className="checkout-page">
            <NavBar />
            <div className="checkout-container">
                Order Placed! Thank you for your purchase!
            </div>
            <div className="checkout-footer"><Footer/></div>
        </div>
    )
}