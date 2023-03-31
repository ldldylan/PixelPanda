
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtworks } from "../../store/artworks";
import { useHistory } from "react-router-dom";
import './Wishlist.css'
import { fetchArtworks } from "../../store/artworks";
import { getWishlistItems, deleteAllWishlistItems } from "../../store/wishlistItems";
import { addNewCartItem } from "../../store/cartItems";
import { fetchUserWishlistItems } from "../../store/wishlistItems";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { deleteWishlistItem, clearWishlist } from "../../store/wishlistItems";
import Loading from '../Loading/Loading'

const Wishlist = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const artworks = useSelector(getArtworks);
    const artworksObj = useSelector(state => state.artworks);
    const wishlistItems = useSelector(getWishlistItems);
    const cartItems = useSelector(state => Object.values(state.cartItems));
    const currentUser = useSelector((state) => state.session.user)
    const [subTotal, setSubTotal] = useState(0.0)
    const [matchingArtworks, setMatchingArtworks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [timeoutMessage, setTimeoutMessage] = useState("");
    const [toolTipClassName, setToolTipClassName] = useState("tooltip");


    useEffect(() => {
        Promise.all([
            dispatch(fetchArtworks()),
            currentUser ? dispatch(fetchUserWishlistItems(currentUser._id)) : null,
        ]).then(() => {
            setLoaded(true);
        });
    }, [dispatch, currentUser]);

    const calculateSubTotal = () => {
        let sumPrice = 0
        const matchingArtworks = wishlistItems
            .map((wishlistItem) => artworks.find((artwork) => artwork._id === wishlistItem.artwork))
            .filter((artwork) => artwork !== undefined);
        setMatchingArtworks(matchingArtworks);
        console.log(matchingArtworks);
        if (matchingArtworks.length === 0) {
            setSubTotal(0);
            return;
        }

        matchingArtworks.forEach(artwork => {
            if (artwork?.price) sumPrice += artwork.price
        })
        setSubTotal(Math.round(sumPrice * 100) / 100)

    };

    useEffect(() => {
        calculateSubTotal();

    }, [wishlistItems, artworks]);

    const handleCheckout = (e) => {
        e.preventDefault();
        // dispatch(deleteAllWishlistItems(currentUser._id));
        // history.push('/checkout')
        // alert("Thank you for your purchase! Your order is being processed.")
        // history.push('/');
    };

    const handleAddItemToCart = (e, wishlistArtwork) => {
        e.preventDefault();
        const artworksInCart = cartItems.map(cartItem => cartItem.artwork);
        const currentWishlistItem = wishlistItems.find(wishlistItem => wishlistItem.artwork === wishlistArtwork._id);
        if (!artworksInCart.includes(wishlistArtwork._id)) {
            dispatch(addNewCartItem({ artwork: artworksObj[wishlistArtwork._id] }, currentUser._id))
            dispatch(deleteWishlistItem(currentWishlistItem._id));
            setTimeoutMessage("Artwork added to cart!");
            setToolTipClassName("tooltip");
            history.push('/wishlist');
        }
        else if (artworksInCart.includes(wishlistArtwork._id)) {
            const newTimeoutId = setTimeout(() => {
                setShowToolTip(false);
            }, 2500);
            setTimeoutId(newTimeoutId);
            setTimeoutMessage('Artwork is already in your cart!');
            setToolTipClassName("tooltip error");
            history.push('/wishlist');
        }
    }

    const handleDeteWishlistItem = wishlistArtworkId => (e) => {
        e.preventDefault();
        for (let i = 0; i < wishlistItems.length; i++) {
            if (wishlistItems[i].artwork === wishlistArtworkId) {
                dispatch(deleteWishlistItem(wishlistItems[i]._id))
                history.push('/wishlist')
            }
        }
    }

    const handleClearWishlist = e => {
        e.preventDefault();
        dispatch(deleteAllWishlistItems(currentUser._id));
        history.push('/wishlist')
    }

    if (!loaded) {
        return (
            <>
                <NavBar />
                <Loading />
            </>

        )
    } else {
        return (
            <>
                <NavBar />
                <div className="wishlist-page">
                    {showToolTip && <div className={toolTipClassName}>{timeoutMessage}</div>}
                    <form onSubmit={handleClearWishlist} className="clear-form">
                        <input
                            type='submit'
                            className="clear-btn"
                            value="Remove All Items"
                        ></input>
                    </form>
                    {Object.keys(wishlistItems).length > 0 && (
                        <div className="wishlist-container">
                            <div className="wishlist-content">
                                <div className="wishlist-item-box">
                                    <div className="wishlist-item-header">
                                        <div className="wishlist-heading">{wishlistItems.length} item(s) in your shopping wishlist</div>
                                        <div className="wishlist-price-heading">Price</div>
                                    </div>
                                    <div style={{ marginTop: "10px", marginBottom: "10px" }}></div>
                                    <div>
                                        {matchingArtworks.map((wishlistArtwork) => (
                                            <div key={wishlistArtwork._id} className="wishlist-item">
                                                <div className="wishlist-item-info">
                                                    <div className="wishlist-item-img">
                                                        <img src={wishlistArtwork?.ArtworkImageUrl ? wishlistArtwork.ArtworkImageUrl : null} style={{
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundSize: "contain",
                                                            backgroundPosition: "center",
                                                            objectFit: "cover"
                                                        }}
                                                            className="wishlist-item-preview-image"
                                                            onClick={() => history.push(`/artworks/${wishlistArtwork._id}`)} />
                                                    </div>
                                                    <div className="wishlist-item-details">
                                                        <div className="wishlist-item-title">{wishlistArtwork?.name ? wishlistArtwork.name : null}</div>
                                                        <div className="wishlist-item-author" onClick={() => history.push(`/users/${wishlistArtwork.author._id}`)}>By artist: {wishlistArtwork?.author.email ? wishlistArtwork.author.email.split('@')[0] : null}</div>
                                                        <div className="wishlist-item-delete-btn" onClick={(e) => {
                                                            console.log('button clicked');
                                                            handleAddItemToCart(e, wishlistArtwork);
                                                            clearTimeout(timeoutId);
                                                            setShowToolTip(true);
                                                        }
                                                        }>add item to cart</div>
                                                        <div className="wishlist-item-delete-btn" onClick={handleDeteWishlistItem(wishlistArtwork._id)}>remove item from wishlist</div>
                                                    </div>
                                                    <div className="wishlist-item-price">
                                                        ${wishlistArtwork?.price ? wishlistArtwork.price.toFixed(2) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div style={{ marginTop: "10px", marginBottom: "10px" }}></div>
                                </div>
                            </div>
                            <hr className="top-border" />
                            {/* <div className="card-item-artworks">{allWishlistItems}</div> */}
                            {/* 
                    <div className="sub-total-container">
                        Subtotal ({Object.keys(wishlistItems).length}{" "}
                        {Object.keys(wishlistItems).length > 1 ? "items" : "item"}):&nbsp;
                        <span className="sub-total-amt">${subTotal}</span>
                    </div> */}


                        </div>
                    )}
                    {Object.keys(wishlistItems).length < 1 && (
                        <div className="empty-wishlist-container">
                            <div className="panda-box-container">
                                <a href="/"><div className="panda-box"></div></a>
                            </div>
                            <div className="empty-wishlist-heading">
                                Your wishlist is empty
                            </div>
                            <div className="empty-wishlist-text">
                                Looks like you haven't added anything to your wishlist yet.
                            </div>
                            <div className="empty-wishlist-mainpage-link">
                                <a href="/">👉Start shopping👈</a>
                            </div>
                        </div>
                    )}
                </div>
                <div id='wishlist-page-footer'><Footer /></div>
            </>
        )
    }
};

export default Wishlist

