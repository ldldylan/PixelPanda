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
import LensBlurIcon from '@mui/icons-material/LensBlur';function MainPage() {
    return (
      <>
      <NavBar />
      <div className="main-page">
        <div className="main-banner-box">
          <div className="main-banner"><div className="actual-banner"/></div>
        </div>
        <div className="categories">
          <div className="categories-items">
            <div><CropSquareIcon/> <div>2D</div></div>
            <div><ViewInArIcon/> <div>3D</div></div>
            <div><AudiotrackIcon/> <div>AUDIO</div></div>
            <div><LensBlurIcon/> <div>VFX</div></div>
          </div>
        </div>
        <div className="popular-assets-box">
          <h3>POPULAR ASSETS</h3>
          <ul className="assets">
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <img 
              src="https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/public/1678898915410.png" 
              className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <img 
              src="https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/aws_mern/tachie+(125).png" 

              className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <FavoriteBorderIcon className="favorite-item-icon"/>
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Billy Jeans</div>
              <div className="artwork-artist">Michael Jackson</div>
              <div className="artwork-price-cart">
                <div className="artwork-price">$6</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
          </ul>
        </div>
        <div className="popular-assets-box">
          <h3>POPULAR ARTISTS</h3>
          <ul className="assets">
            <li className="asset-item artist">
              <img src="https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/defaultprofile.jpg"  className="artwork-preview-image"/>
              <div className="artwork-name">Artist #1</div>
            </li>
            <li className="asset-item artist">
              <img src="https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/public/1678898915410.png" className="artwork-preview-image"/>
              <div className="artwork-name">Artist #2</div>
            </li>
            <li className="asset-item artist">
              <img 
              style={{ 
              backgroundImage: "url('https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/public/1678898915410.png')", 
              backgroundRepeat: "no-repeat", 
              backgroundSize: "contain",
              backgroundPosition: "center" }} 
              className="artwork-preview-image"/>
              <div className="artwork-name">Artist #3</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #4</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #5</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #6</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #7</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #8</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #9</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #10</div>
            </li>
          </ul>
        </div>
      <Footer/>
      </div>
      </>);
  }
  
  export default MainPage;