// src/components/MainPage/MainPage.js
import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CropSquareIcon from '@mui/icons-material/CropSquare';
// import ViewInArIcon from '@mui/icons-material/ViewInAr';
// import AudiotrackIcon from '@mui/icons-material/Audiotrack';
// import LensBlurIcon from '@mui/icons-material/LensBlur';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchArtworks } from '../../store/artworks';
import { getArtworks, getArtwork } from '../../store/artworks';
import { getUsers, fetchUsers } from '../../store/users';
import { useSelector } from 'react-redux';
import { addNewCartItem } from '../../store/cartItems';
import { fetchCartItems } from '../../store/cartItems';
import { useParams } from 'react-router-dom';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';
import Loading from '../Loading/Loading'
import { addNewWishlistItem, deleteWishlistItem } from '../../store/wishlistItems';
import { fetchUserWishlistItems, getWishlistItems } from '../../store/wishlistItems';
function MainPage() {
  const dispatch = useDispatch();
  const artworks = useSelector(getArtworks);
  const users = useSelector(getUsers);
  const history = useHistory();
  const cartItems = useSelector((state) => state.cartItems)
  
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const [currentType, setCurrentType] = useState('popular');
  const [clickedSwap, setClickedSwap] = useState(false);
  const [artworksArray, setArtworksArray] = useState([]);
  const [showToolTip, setShowToolTip] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [timeoutMessage, setTimeoutMessage] = useState("");
  const [toolTipClassName, setToolTipClassName] = useState("tooltip");
  const [favorites, setFavorites] = useState({});
  const [currentCategory, setCurrentCategory] = useState('POPULAR');
  const [currentLikedArtworkId, setCurrentLikedArtworkId] = useState(null);
  const wishlists = useSelector(getWishlistItems);

  // const artworkId=null;
  // let artwork=useSelector(getArtwork(artworkId));
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
    if (currentLikedArtworkId&& !find && favorites[currentLikedArtworkId] === true) {

      console.log("passinghere", currentLikedArtworkId)
      dispatch(addNewWishlistItem({ artwork: currentLikedArtworkId }, sessionUser._id))
    } else if (currentLikedArtworkId && find && favorites[currentLikedArtworkId] === false) {
      console.log("currentLikedArtworkId", currentLikedArtworkId)
      console.log("wishlists", wishlists)
      let wishlistItemId = find._id
      console.log("wishlistItemId", wishlistItemId)
      dispatch(deleteWishlistItem(wishlistItemId));

    }
  }, [favorites])

  if ((artworksArray.length === 0 && artworks.length !== 0)) {
    setArtworksArray(artworks)
  }
  function loadArtworks() {
    if (artworksArray.length !== artworks.length) {
      setArtworksArray(artworks.filter(artwork => artwork.category === currentType));
    }
  }
  useEffect(() => {
    loadArtworks();
  }, [artworks])

  function changeCategory() {
    if (currentType === "popular") {
      setArtworksArray(artworks);
      setCurrentCategory('POPULAR');
    } else if (currentType === "chinese") {
      setCurrentCategory("CHINESE");
      setArtworksArray(artworks.filter(artwork => artwork.category === "chinese"))
    } else if (currentType === "japanese") {
      setCurrentCategory('JAPANESE');
      setArtworksArray(artworks.filter(artwork => artwork.category === "japanese"))
    } else if (currentType === "pixel") {
      setCurrentCategory('PIXEL');
      setArtworksArray(artworks.filter(artwork => artwork.category === "pixel"))
    } else if (currentType === "fantasy") {
      setCurrentCategory("FANTASY");
      setArtworksArray(artworks.filter(artwork => artwork.category === "fantasy"))
    }
  }
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
      dispatch(fetchArtworks()),
      dispatch(fetchUsers()),
      dispatch(fetchCartItems()),
      sessionUser ? dispatch(fetchUserWishlistItems(sessionUser._id)) : Promise.resolve(),
    ]).then(() => {
      loadWishlistItems();
    }).then(() => {
      setLoaded(true);

    })
  }, [dispatch, sessionUser])

  const handleAddCartItem = (e, artworkId) => {
    e.preventDefault();
    if (sessionUser) {
      const userCartItems = Object.values(cartItems).filter(item => item.user._id === sessionUser._id )
      const artworkArray = userCartItems.map(item => item.artwork);
      const newTimeoutId = setTimeout(() => {
        setShowToolTip(false);
      }, 2500);
      setTimeoutId(newTimeoutId);
      if (!artworkArray.includes(artworkId)) {
        dispatch(addNewCartItem({ artwork: artworkId }, sessionUser._id));
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
    };
  }

  function shuffle(shouldSwap) {
    if (shouldSwap) {
      const shuffledArray = [...artworksArray];
      for (let i = shuffledArray.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [shuffledArray[i - 1], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i - 1]];
      }
      if (shuffledArray !== artworksArray) {
        setArtworksArray(shuffledArray);
      }
      setClickedSwap(false);
    }
  }

  useEffect(() => {
    changeCategory()
  }, [currentType])

  useEffect(() => {
    if (clickedSwap) {
      shuffle(artworksArray, true);
    }
  }, [clickedSwap])

  const [deg, setDeg] = useState(0);

  function handleRotation() {
    setDeg(deg + 360);
    const swapIcon = document.getElementById("swap-icon");
    swapIcon.style.transformOrigin = "center center";
    swapIcon.style.transition = "transform .5s ease";
    swapIcon.style.transform = `rotate(${deg}deg)`;
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
        <div className="main-page">
          {showToolTip && <div className={toolTipClassName}>{timeoutMessage}</div>}
          <div data-aos="zoom-in-up"
            data-aos-duration="3000"
            className="main-banner-box">
            <div className="main-banner"><div className="actual-banner" /></div>
          </div>
          <div className="categories">
            <div className="categories-items">
              <div className="category" id="popular-label" onClick={() => setCurrentType('popular')}>
                <div className="category-wrapper"><div id='popular-icon' /></div>
                <div className="category-name">Popular</div>
              </div>
              <div className="category" id="chinese-label" onClick={() => setCurrentType('chinese')}>
                <div className="category-wrapper"><div id='chinese-icon' /></div>
                <div className="category-name" >Chinese</div>
              </div>
              <div className="category" id="japanese-label" onClick={() => setCurrentType('japanese')}>
                <div className="category-wrapper"><div id='japanese-icon' /></div>
                <div className="category-name" >Japanese</div></div>
              <div className="category" id="pixel-label" onClick={() => setCurrentType('pixel')}>
                <div className="category-wrapper"><div id='pixel-icon' /></div>
                <div className="category-name" >Pixel</div></div>
              <div className="category" id="fantasy-label" onClick={() => setCurrentType('fantasy')}>
                <div className="category-wrapper"><div id='fantasy-icon' /></div>
                <div className="category-name">Fantasy</div></div>
            </div>
          </div>
          <div className="popular-assets-box">
            <div className='popular-assets-box-header'><h3>{currentCategory} ASSETS</h3><div id='swap-button' onClick={e => { setClickedSwap(true); handleRotation() }}><div id='swap-icon'></div><div id='swap-text'>Swap</div></div></div>
            <ul className="assets">
              {artworksArray.slice(0, 10).map(artwork => (
                <li key={artwork._id ? artwork._id : null}
                  className="asset-item"
                >
                  {/* <FavoriteBorderIcon className="favorite-item-icon" fontSize='35px'/> */}
                  {sessionUser&&artwork.author._id !== sessionUser._id && sessionUser ?(<div onClick={() => toggleFavorite(artwork._id)}>
                    {favorites[artwork._id] ?
                      <FavoriteIcon style={{ color: "red" }} className="favorite-item-icon" fontSize="40" /> :
                      <FavoriteBorderIcon className="favorite-item-icon" fontSize="40px" />}
                  </div>) : null
                  }
                  
                  <img
                    src={artwork?.ArtworkImageUrl ? artwork.ArtworkImageUrl : null}
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      objectFit: "cover"
                    }}
                    className="artwork-preview-image"
                    onClick={artwork ? () => history.push(`/artworks/${artwork._id}`) : null} />
                  <div className="artwork-name"
                    onClick={() => history.push(`/artworks/${artwork._id}`)}><p>{artwork?.name ? artwork.name : null}</p></div>
                  <div className="artwork-artist">{artwork?.author?._id!==sessionUser?._id ? artwork?.author?.email ? artwork.author.email.split('@')[0] : null : "You"}</div>
                  <div className="artwork-price-cart">
                    <div className="artwork-price"><p>${artwork?.price ? artwork.price.toFixed(2) : null}</p></div>
                    
                    {artwork?.author?._id !== sessionUser?._id &&
                      (<div className="artwork-cart"
                        onClick={artwork?._id ? (e) => {
                          clearTimeout(timeoutId);
                          handleAddCartItem(e, artwork._id);
                          setShowToolTip(true);

                        } : null}>
                        <AddShoppingCartIcon />
                      </div>)
                    }
                    {artwork?.author?._id === sessionUser?._id && 
                      (<div className="artwork-owned" onClick={artwork ? () => history.push(`/artworks/${artwork._id}`) : null}><p>Owned</p></div>)}
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="popular-assets-box">
            <h3>POPULAR ARTISTS</h3>
            <ul className="assets">
              {users.slice(0, 10).map(user => (
                <li
                  key={user?._id ? user._id : null} className="asset-item artist">
                  <img
                    src={user?.profileImageUrl ? user.profileImageUrl : null}
                    style={{
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      objectFit: "cover"
                    }}
                    className="artwork-preview-image"
                    onClick={user?._id ? () => history.push(`/users/${user._id}`) : null} />
                  <div className="artwork-name artist"
                    onClick={user?._id ? () => history.push(`/users/${user._id}`) : null}>
                    <p>{user?.email ? user.email.split('@')[0] : null}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </>);
  }
}


export default MainPage;