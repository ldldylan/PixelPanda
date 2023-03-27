
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtworks } from "../../store/artworks";
import { useHistory } from "react-router-dom";
import './Cart.css'
import { fetchArtworks } from "../../store/artworks";
import { getCartItems } from "../../store/cartItems";
import {fetchUserCartItems} from "../../store/cartItems";
import {deleteAllCartItems} from "../../store/cartItems";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { deleteCartItem } from "../../store/cartItems";

const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const artworks = useSelector(getArtworks);
    const cartItems = useSelector(getCartItems);
    const currentUser = useSelector((state) => state.session.user)
    const [subTotal, setSubTotal] = useState(0.0)
    const [matchingArtworks, setMatchingArtworks] = useState([]);
    
    
    useEffect(() => {
        dispatch(fetchArtworks())
        if (currentUser) dispatch(fetchUserCartItems(currentUser._id))
    }, [dispatch, currentUser]);
    
    const calculateSubTotal = () => {
        let sumPrice = 0
        const matchingArtworks = cartItems
            .map((cartItem) => artworks.find((artwork) => artwork._id === cartItem.artwork))
            .filter((artwork) => artwork !== undefined);
        setMatchingArtworks(matchingArtworks);
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

    const handleCheckout = (e) => {
        e.preventDefault();
        dispatch(deleteAllCartItems(currentUser._id));
        history.push('/checkout')
        alert("Thank you for your purchase! Your order is being processed.")
        history.push('/');
    };
    
    const handleDeteCartItem = cartArtworkId => (e) => {
        e.preventDefault();
        for(let i=0;i<cartItems.length;i++){
            if(cartItems[i].artwork === cartArtworkId){
                dispatch(deleteCartItem(cartItems[i]._id))
                history.push('/cart')
            }
        }
    }
    return(
        <>
        <NavBar/>
        <div className="cart-page">
            {Object.keys(cartItems).length > 0 && (
                <div className="cart-container">
                    <div className="cart-content">
                        <div className="cart-item-box">
                            <div className="cart-item-header">
                                <div className="cart-heading">{cartItems.length} item(s) in your shopping cart</div>
                                <div className="cart-price-heading">Price</div>
                            </div>
                            <div style={{marginTop: "10px", marginBottom: "10px"}}></div>
                            <div>
                                {matchingArtworks.map((cartArtwork) => (
                                    <div key={cartArtwork._id} className="cart-item">
                                        <div className="cart-item-info">
                                            <div className="cart-item-img">
                                                <img src={cartArtwork?.ArtworkImageUrl ? cartArtwork.ArtworkImageUrl : null} style={{
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundSize: "contain",
                                                    backgroundPosition: "center",
                                                    objectFit: "cover"}}
                                                    className="cart-item-preview-image"
                                                    onClick={() => history.push(`/artworks/${cartArtwork._id}`)}/>
                                            </div>
                                            <div className="cart-item-details">
                                                    <div className="cart-item-title">{cartArtwork?.name ? cartArtwork.name : null}</div>
                                                    <div className="cart-item-author" onClick={()=> history.push(`/users/${cartArtwork.author._id}`)}>By artist: {cartArtwork?.author.email ? cartArtwork.author.email.split('@')[0] : null}</div>
                                                    <div className="cart-item-delete-btn" onClick={handleDeteCartItem(cartArtwork._id)}>remove item from cart</div>
                                            </div>
                                            <div>

                                            </div>
                                            <div className="cart-item-price">
                                                ${cartArtwork?.price ? cartArtwork.price : null}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div style={{ marginTop: "10px", marginBottom: "10px" }}></div>
                        </div>
                        <div className="checkout-box">
                            <div className="checkout-container">
                                <div className="sub-total-container">
                                    Subtotal ({Object.keys(cartItems).length}{" "}
                                    {cartItems.length > 1 ? "items" : "item"}):&nbsp;
                                    ${subTotal}
                                </div>
                                <form onSubmit={handleCheckout} className="checkout-form">
                                    <input
                                        type='submit'
                                        className="checkout-btn"
                                        value="Proceed to Checkout"
                                    ></input>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr className="top-border" />
                    {/* <div className="card-item-artworks">{allCartItems}</div> */}
{/* 
                    <div className="sub-total-container">
                        Subtotal ({Object.keys(cartItems).length}{" "}
                        {Object.keys(cartItems).length > 1 ? "items" : "item"}):&nbsp;
                        <span className="sub-total-amt">${subTotal}</span>
                    </div> */}

                    
                </div>
            )}
            {Object.keys(cartItems).length < 1 && (
                <div className="empty-cart-container">
                    <div className="panda-box-container">
                    <a href="/"><div className="panda-box"></div></a>
                    </div>
                    <div className="empty-cart-heading">
                        Your cart is empty
                    </div>
                    <div className="empty-cart-text">
                        Looks like you haven't added anything to your cart yet.
                    </div>
                    {/* <div className="empty-cart-mainpage-link">
                        <a href="/">Go to main page</a>
                    </div> */}
                </div>
            )}
        </div>
        <Footer/>
        </>
    )
};

export default Cart

