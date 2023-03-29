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
        dispatch(deleteAllCartItems(currentUser._id));
        alert("Thank you for your purchase! Your order is being processed.");
        history.push('/');
    }, [dispatch]);

    return(
        <div className="checkout-page">
            <NavBar />
            <div className="checkout-container">
                Order Placed! Thank you for your purchase!
            </div>
            <div className="checkout-image"/>
            <div className="checkout-footer"><Footer/></div>
        </div>
    )
}