// src/components/MainPage/MainPage.js
import './MainPage.css';
import NavBar from '../NavBar/NavBar';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function MainPage() {
    return (
      <>
      <NavBar />
      <div className="main-page">
        <div className="main-banner-box">
          <div className="main-banner"/>
        </div>
        <div className="popular-assets-box">
          POPULAR ASSETS
          <ul className="assets">
            <li className="asset-item">
              <div className="artwork-preview-image"/>
              <div classname="artwork-artist-price">
                <div className="artwork-artist">Michael Jackson</div>
                <div className="artwork-price">$6</div>
              </div>
              <div className="artwork-name-cart">
                <div className="artwork-name">Billy Jeans</div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <div className="artwork-preview-image"/>
              <div classname="artwork-artist-price">
                <div className="artwork-artist"></div>
                <div className="artwork-price"></div>
              </div>
              <div className="artwork-name-cart">
                <div className="artwork-name"></div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <div className="artwork-preview-image"/>
              <div classname="artwork-artist-price">
                <div className="artwork-artist"></div>
                <div className="artwork-price"></div>
              </div>
              <div className="artwork-name-cart">
                <div className="artwork-name"></div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <div className="artwork-preview-image"/>
              <div classname="artwork-artist-price">
                <div className="artwork-artist"></div>
                <div className="artwork-price"></div>
              </div>
              <div className="artwork-name-cart">
                <div className="artwork-name"></div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <div className="artwork-preview-image"/>
              <div classname="artwork-artist-price">
                <div className="artwork-artist"></div>
                <div className="artwork-price"></div>
              </div>
              <div className="artwork-name-cart">
                <div className="artwork-name"></div>
                <AddShoppingCartIcon/>
              </div>
            </li>
            <li className="asset-item">
              <div className="artwork-preview-image"/>
              <div classname="artwork-artist-price">
                <div className="artwork-artist"></div>
                <div className="artwork-price"></div>
              </div>
              <div className="artwork-name-cart">
                <div className="artwork-name"></div>
                <AddShoppingCartIcon/>
              </div>
            </li>
          </ul>
        </div>
        <div className="popular-artists-box">
          POPULAR ARTISTS
        </div>
      </div>
      </>);
  }
  
  export default MainPage;