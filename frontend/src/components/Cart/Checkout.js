import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteAllCartItems } from "../../store/cartItems";
import "./Checkout.css"
export default function Checkout() {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        Promise.all([dispatch(deleteAllCartItems(currentUser._id))]).then(() => {
            alert("Thank you for your purchase! Your order is being processed.");
            history.push('/');
        });
    }, [dispatch]);

    return(<>
        <NavBar />
        <div className="checkout-page">
            <div className="checkout-container">
                <a href="/"><div className="checkout-image"/></a>
                Order Placed! <br/> Thank you for your purchase!
            </div>
            
            <div className="checkout-footer"><Footer/></div>
        </div>
        </>
    )
}