import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../../store/users";
import artworksReducer, { fetchUserArtworks } from "../../store/artworks";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EmailIcon from '@mui/icons-material/Email';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { addNewCartItem } from '../../store/cartItems';
import { fetchCartItems } from '../../store/cartItems';
import './User.css'
import Loading from '../Loading/Loading'
import { addNewWishlistItem, fetchUserWishlistItems, deleteWishlistItem } from '../../store/wishlistItems';
import { getWishlistItems } from '../../store/wishlistItems';
function User() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(state => state.users[userId])
    const artworks = useSelector((state) => state.artworks);
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user)
    const cartItems = useSelector((state) => state.cartItems)
    const [loaded, setLoaded] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [timeoutMessage, setTimeoutMessage] = useState("");
    const [toolTipClassName, setToolTipClassName] = useState("tooltip");
    const [favorites, setFavorites] = useState({});
    const [currentLikedArtworkId, setCurrentLikedArtworkId] = useState(null);
    const wishlists = useSelector(getWishlistItems);

    const toggleFavorite = (artworkId) => {
        // const artwork=artworks.find(artwork=>artwork._id===artworkId)
        setCurrentLikedArtworkId(artworkId);

        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [artworkId]: !prevFavorites[artworkId]
        }))
    }

    useEffect(() => {
        const find = wishlists.find(wishlistItem => wishlistItem.artwork === currentLikedArtworkId);
        if (currentLikedArtworkId && !find && favorites[currentLikedArtworkId] === true) {

            dispatch(addNewWishlistItem({ artwork: currentLikedArtworkId }, currentUser._id))
        } else if (currentLikedArtworkId && find && favorites[currentLikedArtworkId] === false) {
            let wishlistItemId = find._id
            dispatch(deleteWishlistItem(wishlistItemId));

        }
    }, [favorites])
    function loadWishlistItems() {
        if (wishlists) {
            for (let i = 0; i < wishlists.length; i++) {
                setFavorites(prevFavorites => ({
                    ...prevFavorites,
                    [wishlists[i].artwork]: true
                }))
            }
        }
    }
    useEffect(() => {
        loadWishlistItems();
    }, [wishlists])
    useEffect(() => {
        Promise.all([

            dispatch(fetchUser(userId)),
            dispatch(fetchUserArtworks(userId)),
            dispatch(fetchCartItems()),
            currentUser ? dispatch(fetchUserWishlistItems(currentUser._id)) : Promise.resolve(),

        ]).then(() => {
            loadWishlistItems();
        }).then(() => {
            setLoaded(true);
        })
    }, [dispatch, userId])

    const [shouldFetchArtworks, setShouldFetchArtworks] = useState(true);
    const updateShouldFetchArtworks = (newValue) => {
        setShouldFetchArtworks(newValue);
    };
    // useEffect(() => {
    //     if (shouldFetchArtworks) {
    //         dispatch(fetchUserArtworks(userId));
    //         setShouldFetchArtworks(false);
    //     }
    // }, [dispatch, shouldFetchArtworks, userId]);

    const [isLiked, setIsLiked] = useState(false);
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleAddCartItem = (e, artworkId) => {
        e.preventDefault();
        if (currentUser) {
            const artworkArray = Object.values(cartItems).map((item) => item.artwork);
            const newTimeoutId = setTimeout(() => {
                setShowToolTip(false);
            }, 2500);
            setTimeoutId(newTimeoutId);
            if (!artworkArray.includes(artworkId)) {
                dispatch(addNewCartItem({ artwork: artworkId }, currentUser._id));
                setTimeoutMessage("Artwork added to cart!");
                setToolTipClassName("tooltip");
            }
            else {
                setTimeoutMessage('Artwork is already in your cart!');
                setToolTipClassName("tooltip error");
            }
        }
        else {
            history.push('/login');
        }
    };
    if (!loaded) {
        return (
            <>
                <NavBar />
                <Loading />
            </>

        )
    } else {
        return (<>
            <NavBar updateShouldFetchArtworks={updateShouldFetchArtworks} />
            {showToolTip && <div className={toolTipClassName}>{timeoutMessage}</div>}
            <div className="user">
                <div className="user-main">
                    <div className="user-image-container">
                        <img
                            src={user?.profileImageUrl ? user.profileImageUrl : null}
                            style={{
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                objectFit: "cover"
                            }}
                            className="user-image" />
                        {currentUser._id !== userId ? (<>
                            <button className="msg-user-button"><EmailIcon /></button>
                            <button className="like-user-button"
                                onClick={handleLikeClick}
                                style={{ color: isLiked ? 'blue' : 'white' }}><ThumbUpIcon /></button>
                        </>) : null}
                    </div>
                    <div className="user-info">
                        <div className="user-author">
                            Welcome to <br />
                            {user?.email ? user.email.split('@')[0] : "Mysterious Artist"}'s profile page
                        </div>
                    </div>
                </div>

                <div className="user-artworks-container">
                     
                    {currentUser._id !== userId ? user?.email ? user.email.split('@')[0].concat('s Artworks') : "Mysterious Artist" : "Your Artworks"}
                    <div className="divider user-show" />
                    <ul className="user-artworks">
                        {/* {console.log(artworks ? artworks : null)} */}
                        {Object.keys(artworks).length === 0 ? null : Object.keys(artworks).map(key => (
                            artworks[key].author._id === userId ? (
                                <li key={artworks[key]._id} className="asset-item">
                                    <div>
                                        {/* <FavoriteBorderIcon className="favorite-item-icon" /> */}
                                        <div className="artwork-image-container">
                                            <img
                                                src={artworks[key]?.ArtworkImageUrl ?? null}
                                                style={{
                                                    display: "block",
                                                    margin: "0 auto",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundSize: "contain",
                                                    backgroundPosition: "center",
                                                    objectFit: "cover"
                                                }}
                                                className="artwork-preview-image-user-show"
                                                onClick={() => history.push(`/artworks/${artworks[key]._id}`)} />
                                        </div>
                                        {currentUser._id!==userId &&(<div onClick={() => toggleFavorite(artworks[key]._id)}>
                                            {favorites[artworks[key]._id] ?
                                                <FavoriteIcon style={{ color: "red" }} className="favorite-item-icon" fontSize="40" /> :
                                                <FavoriteBorderIcon className="favorite-item-icon" fontSize="40px" />}
                                        </div>)

                                        }
                                        
                                        <div className="artwork-name"
                                            onClick={() => history.push(`/artworks/${artworks[key]._id}`)}><p>{artworks[key].name}</p></div>
                                        <div className="artwork-artist">{artworks[key]?.author?.email?.split('@')[0] ? artworks[key]?.author.email.split('@')[0] : null}</div>
                    
                                        <div className="artwork-price-cart">
                                            <div className="artwork-price"><p>${artworks[key].price.toFixed(2)}</p></div>
                                            {currentUser._id !== userId && (
                                            <div className="artwork-cart"
                                                onClick={artworks[key]?._id ? (e) => {
                                                    clearTimeout(timeoutId);
                                                    handleAddCartItem(e, artworks[key]._id);
                                                    setShowToolTip(true);
                                                    const newTimeoutId = setTimeout(() => {
                                                        setShowToolTip(false);
                                                    }, 2500);
                                                    setTimeoutId(newTimeoutId);
                                                } : null}>
                                                <AddShoppingCartIcon />
                                            </div>
                                            )}
                                        </div>

                                    </div>
                                </li>
                            ) : null
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>);
    }
}

export default User;