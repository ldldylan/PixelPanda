// import CartItemShow from "./CartItemShow";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RECEIVE_CARTITEMS, ADD_CARTITEM, REMOVE_CARTITEM } from "../../store/cartItems";
import { fetchCartItems } from "../../store/cartItems";
import { clearCart } from "../../store/cartItems";
import { getArtworks } from "../../store/artworks";
import { useHistory } from "react-router-dom";
import './Cart.css'
import { fetchArtworks } from "../../store/artworks";
import { getCartItems } from "../../store/cartItems";
import {fetchUserCartItems} from "../../store/cartItems";
import {deleteAllCartItems} from "../../store/cartItems";

const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const artworks = useSelector(getArtworks);
    const cartItems = useSelector(getCartItems);
    const currentUser = useSelector((state) => state.session.user)
    const [subTotal, setSubTotal] = useState(0.0)
    
    useEffect(() => {
        dispatch(fetchArtworks())
        if (currentUser) dispatch(fetchUserCartItems(currentUser._id))
    }, [dispatch]);
    

    const calculateSubTotal = () => {
        let sumPrice = 0
        // console.log(cartItems,'cartItems')
        let matchingArtworks = cartItems.length === 0 ? [] : cartItems.map(cartItem => artworks.find(artwork => artwork._id === cartItem.artwork)).filter(artwork => artwork !== undefined);
        console.log(matchingArtworks.length > 0,"matchingArtworks.length > 0");console.log(matchingArtworks, 'matchingArtworks')
        if (matchingArtworks.length === 0){
            setSubTotal(0);
            return;
        }
        
        matchingArtworks.forEach(artwork => {
            if(artwork?.price) sumPrice += artwork.price
        }) 
        setSubTotal(Math.round(sumPrice * 100) /100)
    };


    useEffect(() => {
        calculateSubTotal();
    }, [cartItems, artworks]);

    console.log(cartItems,'cartItems')
    
        // let matchingArtworks = cartItems.length === 0 ? [] : cartItems.map(cartItem => artworks.find(artwork => artwork._id === cartItem.artwork))

    const handleCheckout = (e) => {
        e.preventDefault();
        dispatch(deleteAllCartItems(currentUser._id));
        history.push('/checkout')
    };
    // console.log(cartItems.length, "cartItems")
    // if (Object.keys(cartItems).length === 0) return null;
    return (
        <div className="cart-bg-container">
            {Object.keys(cartItems).length > 0 && (
                <>
                    <div className="cart-heading">Shopping Cart</div>
                    <div className="cart-price-heading">Price</div>
                    <hr className="top-border" />
                    {/* <div className="card-item-artworks">{allCartItems}</div> */}

                    <div className="sub-total-container">
                        Subtotal ({Object.keys(cartItems).length}{" "}
                        {Object.keys(cartItems).length > 1 ? "items" : "item"}):&nbsp;
                        <span className="sub-total-amt">${subTotal}</span>
                    </div>

                    <div className="checkout-container">
                        <div className="sub-total-container">
                            Subtotal ({Object.keys(cartItems).length}{" "}
                            {cartItems.length > 1 ? "items" : "item"}):&nbsp;
                            <span className="sub-total-amt">${subTotal}</span>
                        </div>
                        <form onSubmit={handleCheckout}>
                            <input
                                type='submit'
                                className="checkout-btn"
                                value="Proceed to Checkout"
                            ></input>
                        </form>
                    </div>
                </>
            )}
            {Object.keys(cartItems).length < 1 && (
                <div className="empty-cart-container">
                <div className="empty-cart-heading">
                    Your cart is empty
                </div>
                <div className="empty-cart-text">
                    Looks like you haven't added anything to your cart yet.
                </div>
                <div className="empty-cart-mainpage-link">
                    <a href="/">Go to main page</a>
                </div>
                </div>
            )}
        </div>
    );
};

export default Cart