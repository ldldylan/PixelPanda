// import CartItemShow from "./CartItemShow";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RECEIVE_CARTITEMS, ADD_CARTITEM, REMOVE_CARTITEM } from "../../store/cartItems";
import { fetchCartItems } from "../../store/cartItems";
import { clearCart } from "../../store/cartItems";
import { getArtworks } from "../../store/artworks";
import { useHistory } from "react-router-dom";
import './Cart.css'
import EmptyCart from "./EmptyCart";
import { fetchArtworks } from "../../store/artworks";
import { getCartItems } from "../../store/cartItems";
const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const artworks = useSelector(getArtworks);
    const cartItems = useSelector(getCartItems);
    console.log(cartItems,'cartItems')
    const [subTotal, setSubTotal] = useState(0.0)

    // const allCartItems = artworks.map((artwork) => (
    //     <div key={artwork.id} >
    //         {/* <CartItem artwork={artwor?k} /> */}
    //         {/* <p>{artwork}</p> */}
    //         {/* <hr /> */}
    //     </div>
    // ));
    // console.log(allCartItems, "allCartItems")
    // console.log(artworks, "artworks")

    let matchingArtworks = cartItems.map(cartItem=>artworks.find(artwork=>artwork._id===cartItem.artwork))
    
    const calculateSubTotal = () => {
        let sumPrice = 0
        matchingArtworks = cartItems.map(cartItem=>artworks.find(artwork=>artwork._id === cartItem.artwork))
        if (matchingArtworks.length){
            matchingArtworks.forEach(artwork => {
                sumPrice += artwork.price
            }) 
        }
        setSubTotal(Math.round(sumPrice * 100) /100)
    };
    
    useEffect(() => {
        calculateSubTotal();
    }, [artworks]);
    
    useEffect(() => {
        dispatch(fetchArtworks())
        dispatch(fetchCartItems())
        
    }, [dispatch]);

    const calculatecartItemsize = () => {
        return cartItems.length
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearCart());
        history.push('/checkout')
    };

    if (!cartItems) return null;
    return (
        <div className="cart-bg-container">
            {calculatecartItemsize() > 0 && (
                <>
                    <div className="cart-heading">Shopping Cart</div>
                    <div className="cart-price-heading">Price</div>
                    <hr className="top-border" />
                    {/* <div className="card-item-artworks">{allCartItems}</div> */}

                    <div className="sub-total-container">
                        Subtotal ({calculatecartItemsize()}{" "}
                        {calculatecartItemsize() > 1 ? "items" : "item"}):&nbsp;
                        <span className="sub-total-amt">${subTotal}</span>
                    </div>

                    <div className="checkout-container">
                        <div className="sub-total-container">
                            Subtotal ({calculatecartItemsize()}{" "}
                            {calculatecartItemsize() > 1 ? "items" : "item"}):&nbsp;
                            <span className="sub-total-amt">${subTotal}</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='submit'
                                className="checkout-btn"
                                value="Proceed to Checkout"
                            ></input>
                        </form>
                    </div>
                </>
            )}
            {calculatecartItemsize() < 1 && (
                <>
                    {/* <EmptyCart /> */}
                </>
            )}

    //     </div>
    // );
};

export default Cart