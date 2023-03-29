// src/components/MainPage/MainPage.js
import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CropSquareIcon from '@mui/icons-material/CropSquare';
// import ViewInArIcon from '@mui/icons-material/ViewInAr';
// import AudiotrackIcon from '@mui/icons-material/Audiotrack';
// import LensBlurIcon from '@mui/icons-material/LensBlur';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchArtworks } from '../../store/artworks';
import { getArtworks } from '../../store/artworks';
import { getUsers, fetchUsers } from '../../store/users';
import { useSelector } from 'react-redux';
import { addNewCartItem } from '../../store/cartItems';
import { fetchCartItems } from '../../store/cartItems';
import { useParams } from 'react-router-dom';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';
import Loading from '../Loading/Loading'


function MainPage() {
  const dispatch = useDispatch();
  const artworks = useSelector(getArtworks);
  const users = useSelector(getUsers);
  const history = useHistory();
  const cartItems = useSelector((state) => state.cartItems)
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const [currentType, setCurrentType] = useState('chinese');
  let currentCategory = 'POPULAR'
  useEffect(() => {

    Promise.all([
    dispatch(fetchArtworks()),
    dispatch(fetchUsers()),
    dispatch(fetchCartItems()),
    ]).then(() => {
      setLoaded(true);
    })
    
  }, [dispatch])

  
  const handleAddCartItem = artworkId => e => {
    e.preventDefault();
    if (sessionUser) {
      const artworkArray = Object.values(cartItems).map((item) => item.artwork);
      if (!artworkArray.includes(artworkId))
        dispatch(addNewCartItem({ artwork: artworkId }, sessionUser._id));
      else alert('Artwork is already in your cart!')
    }
    else {
      history.push('/login')
    };
  }

  let artworksArray;
  if(currentType==="all"){
    artworksArray=artworks.slice()
  } else if(currentType==="chinese"){
    currentCategory = 'CHINESE';
    artworksArray = artworks.slice().filter(artwork=>artwork.category==="chinese");
  } else if (currentType === "japanese") {
    currentCategory = 'JAPANESE';
    artworksArray = artworks.slice().filter(artwork => artwork.category === "japanese");
  } else if (currentType === "pixel") {
    currentCategory = 'PIXEL';
    artworksArray = artworks.slice().filter(artwork => artwork.category === "pixel");
  } else if (currentType === "fantasy") {
    currentCategory = 'FANTASY';
    artworksArray = artworks.slice().filter(artwork => artwork.category === "fantasy");
  }
  // console.log(artworksArray,"artworksArray")
  // console.log(currentType,"currentType")  
  function shuffle(array) {
    for (let i = array.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
    return array;
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
        <div data-aos="zoom-in-up"
          data-aos-duration="3000"
          className="main-banner-box">
          <div className="main-banner"><div className="actual-banner" /></div>
        </div>
        <div className="categories">
          <div className="categories-items">
            <div className="category" id="popular-label" onClick={() => setCurrentType('all')}>
              <div className="category-wrapper"><div id='popular-icon'/></div>
              <div className="category-name">Popular</div>
            </div>
            <div className="category" id="chinese-label" onClick={() => setCurrentType('chinese')}>
              <div className="category-wrapper"><div id='chinese-icon'/></div>
              <div className="category-name" >Chinese</div>
            </div>
            <div className="category" id="japanese-label" onClick={() => setCurrentType('japanese')}>
              <div className="category-wrapper"><div id='japanese-icon'/></div>
              <div className="category-name" >Japanese</div></div>
            <div className="category" id="pixel-label" onClick={() => setCurrentType('pixel')}>
              <div className="category-wrapper"><div id='pixel-icon'/></div>
              <div className="category-name" >Pixel</div></div>
            <div className="category" id="fantasy-label" onClick={() => setCurrentType('fantasy')}>
              <div className="category-wrapper"><div id='fantasy-icon'/></div>
              <div className="category-name">Fantasy</div></div>
          </div>
        </div>
        <div className="popular-assets-box">
          <h3>{currentCategory} ASSETS</h3>
          <ul className="assets">
            {shuffle(artworksArray).slice(0, 10).map(artwork => (
              <li key={artwork._id ? artwork._id : null}
                className="asset-item"
              >
                <FavoriteBorderIcon className="favorite-item-icon" />
                {/* <div className="artwork-image-container"> */}
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
                {/* </div> */}
                <div className="artwork-name"
                  onClick={() => history.push(`/artworks/${artwork._id}`)}><p>{artwork?.name ? artwork.name : null}</p></div>
                <div className="artwork-artist">{artwork?.author?.email ? artwork.author.email.split('@')[0] : null}</div>
                <div className="artwork-price-cart">
                  <div className="artwork-price"><p>${artwork?.price ? artwork.price.toFixed(2) : null}</p></div>
                  <div className="artwork-cart" onClick={artwork?._id ? handleAddCartItem(artwork._id) : null}>
                    <AddShoppingCartIcon />
                  </div>
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