
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
    }, [dispatch]);
    
    const calculateSubTotal = () => {
        let sumPrice = 0
        cartItems.length === 0 ? setMatchingArtworks([]) : setMatchingArtworks(cartItems.map(cartItem => artworks.find(artwork => artwork._id === cartItem.artwork)).filter(artwork => artwork !== undefined))
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
        alert("Thank you for your purchase! Your order is being processed.")
        history.push('/');
    };
    console.log(matchingArtworks, "matchingArtworks")
    return(
        <div className="cart-page">
            <NavBar/>
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
                                {matchingArtworks.map((cartElement) => (
                                    <div key={cartElement._id} className="cart-item">
                                        <div className="cart-item-info">
                                            <div className="cart-item-img">
                                                <img src={cartElement?.ArtworkImageUrl ? cartElement.ArtworkImageUrl : null} style={{
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundSize: "contain",
                                                    backgroundPosition: "center",
                                                    objectFit: "cover"}}
                                                    className="cart-item-preview-image"
                                                    onClick={() => history.push(`/artworks/${cartElement._id}`)}/>
                                            </div>
                                            <div className="cart-item-details">
                                                    <div className="cart-item-title">{cartElement?.name ? cartElement.name : null}</div>
                                                    <div className="cart-item-author" onClick={()=> history.push(`/users/${cartElement.author._id}`)}>By artist: {cartElement?.author.email ? cartElement.author.email.split('@')[0] : null}</div>
                                                    <div className="cart-item-delete-btn" ></div>
                                                    <div />
                                            </div>
                                            <div>

                                            </div>
                                            <div className="cart-item-price">
                                                ${cartElement?.price ? cartElement.price : null}
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
    )
};

export default Cart