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
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchArtworks } from '../../store/artworks';
import { getArtworks } from '../../store/artworks';
import { getUsers, fetchUsers} from '../../store/users';
import { useSelector } from 'react-redux';
function MainPage() {
    const dispatch=useDispatch();
    const artworks = useSelector(getArtworks);
    const users = useSelector(getUsers);
    const history = useHistory();
    useEffect(()=>{
      dispatch(fetchArtworks());
      dispatch(fetchUsers());
    },[dispatch])
    return (
      <>
      <NavBar />
      <div className="main-page">
        <div className="main-banner-box">
          <div className="main-banner"><div className="actual-banner"/></div>
        </div>
        <div className="categories">
          <div className="categories-items">
            <div className="category">
              <div className="category-wrapper"><CropSquareIcon/></div>
              <div>2D</div>
            </div>
            <div className="category"><ViewInArIcon/> <div>3D</div></div>
            <div className="category"><AudiotrackIcon/> <div>AUDIO</div></div>
            <div className="category"><LensBlurIcon/> <div>VFX</div></div>
          </div>
        </div>
        <div className="popular-assets-box">
          <h3>POPULAR ASSETS</h3>
          <ul className="assets">
            {artworks.slice(0,10).map(artwork => (
              <li key={artwork._id} 
              className="asset-item"
              onClick={()=> history.push(`/artworks/${artwork._id}`)}>
                <FavoriteBorderIcon className="favorite-item-icon"/>
                <img
                src= {artwork.ArtworkImageUrl} 
                style={{ 
                  backgroundRepeat: "no-repeat", 
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  objectFit: "cover" }} 
                  className="artwork-preview-image"/>
                <div className="artwork-name">{artwork.name}</div>
                <div className="artwork-artist">{artwork.author.email}</div>
                <div className="artwork-price-cart">
                  <div className="artwork-price"><p>${artwork.price}</p></div>
                  <AddShoppingCartIcon/>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="popular-assets-box">
          <h3>POPULAR ARTISTS</h3>
          <ul className="assets">
            {users.slice(0,10).map(user => (
              <li key={user._id} className="asset-item artist">
                <img
                src= {user.profileImageUrl}
                style={{ 
                backgroundRepeat: "no-repeat", 
                backgroundSize: "contain",
                backgroundPosition: "center",
                objectFit: "cover" }} 
                className="artwork-preview-image"/>
                <div className="artwork-name"><p>{user.email}</p></div>
            </li>
            ))}
          </ul>
        </div>
      <Footer/>
      </div>
      </>);
  }
  
  export default MainPage;