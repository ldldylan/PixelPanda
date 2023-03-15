// src/components/MainPage/MainPage.js
import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
function MainPage() {
    return (
      <>
      <NavBar />
      <div className="main-page">
        <div className="main-banner-box">
          <div className="main-banner"><div className="actual-banner"/></div>
        </div>
        <div className="categories">
          <div className="cateogories-items">
            <div></div>
          </div>
        </div>
        <div className="popular-assets-box">
          <h3>POPULAR ASSETS</h3>
          <ul className="assets">
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
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #1</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
              <div className="artwork-name">Artist #2</div>
            </li>
            <li className="asset-item artist">
              <div className="artwork-preview-image"/>
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