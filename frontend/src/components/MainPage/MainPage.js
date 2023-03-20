// src/components/MainPage/MainPage.js
import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import { useDispatch } from 'react-redux';
import { useState ,useEffect, useSyncExternalStore } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchArtworks } from '../../store/artworks';
import { getArtworks } from '../../store/artworks';
import { getUsers, fetchUsers} from '../../store/users';
import { useSelector } from 'react-redux';
import { addNewCartItem } from '../../store/cartItems';
import { fetchCartItems } from '../../store/cartItems';


import { useParams } from 'react-router-dom';
function MainPage() {
    const dispatch=useDispatch();
    const artworks = useSelector(getArtworks);
    const users = useSelector(getUsers);
    const history = useHistory();
    const cartItems = useSelector((state) => state.cartItems)

    const sessionUser = useSelector(state=> state.session.user);

   

    useEffect(()=>{
      dispatch(fetchArtworks());
      dispatch(fetchUsers());
      dispatch(fetchCartItems());
    },[dispatch])

  
    
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

    return (
      <>
      <NavBar />
      <div className="main-page">
        <div data-aos="zoom-in-up"
        data-aos-duration="3000"
        className="main-banner-box">
          <div className="main-banner"><div className="actual-banner"/></div>
        </div>
        <div className="categories">
          <div className="categories-items">
            <div className="category" id="twoD-label">
              <div className="category-wrapper"><CropSquareIcon/></div>
              <div className="category-name" >2D</div>
            </div>
            <div className="category" id="threeD-label">
              <div className="category-wrapper"><ViewInArIcon/></div>
              <div className="category-name" >3D</div></div>
            <div className="category" id="audio-label">
              <div className="category-wrapper"><AudiotrackIcon/></div>
              <div className="category-name" >Audio</div></div>
            <div className="category" id="vfx-label">
              <div className="category-wrapper"><LensBlurIcon/></div>
              <div className="category-name" >VFX</div></div>
          </div>
        </div>
        <div className="popular-assets-box">
          <h3>POPULAR ASSETS</h3>
          <ul className="assets">
            {artworks.slice(0,10).map(artwork => (
              <li key={artwork._id} 
              className="asset-item"
              >
                <FavoriteBorderIcon className="favorite-item-icon"/>
                {/* <div className="artwork-image-container"> */}
                <img
                src= {artwork?.ArtworkImageUrl ? artwork.ArtworkImageUrl : null} 
                style={{ 
                  backgroundRepeat: "no-repeat", 
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  objectFit: "cover" }} 
                  className="artwork-preview-image"
                  onClick={()=> history.push(`/artworks/${artwork._id}`)}/>
                  {/* </div> */}
                <div className="artwork-name"
                onClick={()=> history.push(`/artworks/${artwork._id}`)}><p>{artwork.name}</p></div>
                <div className="artwork-artist">{artwork?.author?.email ? artwork.author.email.split('@')[0] : null}</div>
                <div className="artwork-price-cart">
                  <div className="artwork-price"><p>${artwork.price}</p></div>
                  <div className="artwork-cart" onClick={handleAddCartItem(artwork._id)}>
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
            {users.slice(0,10).map(user => (
              <li
              key={user._id} className="asset-item artist">
                <img
                src= {user.profileImageUrl}
                style={{ 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "contain",
                backgroundPosition: "center",
                objectFit: "cover" }} 
                className="artwork-preview-image"
                onClick={()=> history.push(`/users/${user._id}`)}/>
                <div className="artwork-name artist"
                onClick={()=> history.push(`/users/${user._id}`)}>
                  <p>{user?.email ? user.email.split('@')[0] : null}</p>
                  </div>
            </li>
            ))}
          </ul>
        </div>
      <Footer/>
      </div>
      </>);
  }
  
  export default MainPage;