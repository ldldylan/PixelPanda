import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import './NavBar.css';
import { logout } from '../../store/session';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { Modal } from '../../context/Modal';

import { Modal } from '../context/Modal';
import { SearchResult } from '../context/SearchResult';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import BrushIcon from '@mui/icons-material/Brush';
import CreateArtworkPage from '../Artwork/Create/CreateArtworkPage';

import { getCartItems } from '../../store/cartItems';
function NavBar({ updateShouldFetchArtworks }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user);
  const artworks = useSelector(state => Object.values(state.artworks));
  const artists = useSelector(state => Object.values(state.users));
  // const cartItems = useSelector((state) => state.cartItems);
  const cartItems = useSelector(getCartItems);

  const [showCreateArtworkModal, setShowCreateArtworkModal] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const searchResultsRef = useRef(null);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue !== '') {
      setShowSearchResults(true)
      const filteredArtworks = artworks.filter((artwork) => {
        return artwork.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      if (filteredArtworks.length < 10) {
        const filteredArtists = artists.filter((artist) => {
          return artist.email.toLowerCase().includes(searchValue.toLowerCase());
        });
        filteredArtworks.push(...filteredArtists);
        console.log(filteredArtworks);
      }
      setFilteredResults(filteredArtworks);
    }
    else {
      setShowSearchResults(false);
    }
  }

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const directToCart = e => {
    e.preventDefault();
    history.push('/cart')
  }
  const directToWishlist = e => {
    e.preventDefault();
    history.push('/wishlist')
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchResultsRef]);

  // let cartItemsNum = 0
  // if (cartItems.length !== 0) {
  //   cartItemsNum = cartItems.filter(item => item.user._id === user._id)
  // }
  console.log(cartItems)
  // console.log(cartItemsNum, "cartItemsNum")
  const getLinks = () => {
    if (loggedIn) {
      return (<>
        <div className="navbar">
          <div className="links-nav">
            <NavLink to={{
              pathname: "/"
            }}>
              <div className="navbar-logo" onClick={() => history.push('/')} />
            </NavLink>
          </div>
          <div className="searchbar" ref={searchResultsRef}>
            <SearchIcon id="searchbar-icon" htmlFor="searchbar" />
            <div className="searchbar-field">


              <input
                autoComplete='off'
                id="searchbar"
                type="text"
                placeholder='Search artworks'
                value={searchInput}
                onClick={() => setShowSearchResults(true)}
                onChange={(e) => {
                  searchItems(e.target.value);
                }}
              />

              {showSearchResults && (
                // <SearchResult onClose={() => setShowSearchResults(false)}>
                <div className="searchbar-results">
                  {filteredResults.slice(0, 10).map((result) => {
                    let searchResult;
                    if (result.price) {
                      searchResult = (
                        <NavLink to={`/artworks/${result._id}`}>
                          <div className="searchbar-result-name">
                            {result.name}
                          </div>
                        </NavLink>
                      );
                    } else {
                      searchResult = (
                        <NavLink to={`/users/${result._id}`}>
                          <div className="searchbar-result-name">
                            {result.email.split('@')[0]}
                          </div>
                        </NavLink>
                      );
                    }
                    return searchResult;
                  })}
                </div>
                // </SearchResult>
              )}

            </div>
          </div>
          <div className="nav-tools">
            <div
              onClick={
                () => setShowCreateArtworkModal(true)
              } ><BrushIcon />Create</div>{showCreateArtworkModal && (
                <Modal onClose={() => setShowCreateArtworkModal(false)}
                  className="create-server">
                  <CreateArtworkPage onClose={() => setShowCreateArtworkModal(false)} updateShouldFetchArtworks={updateShouldFetchArtworks}
                  />
                </Modal>
              )}

            <div onClick={() => history.push(`/users/${user._id}`)}><PersonIcon /> Profile</div>
            <div onClick={directToCart}>
              <div className="cart-icon">
                <ShoppingCart /> 
                {Object.keys(cartItems).length > 0 && (
                  <div className="cart-count">{Object.keys(cartItems.filter(item => item.user._id === user._id)).length}</div>
                )}
              </div>
            Cart </div>
            <div onClick={directToWishlist} ><FavoriteIcon /> Wish List </div>


            <div onClick={logoutUser}><LogoutIcon /> Logout</div>
          </div>
        </div>
      </>);
    } else {
      return (
        <div className="navbar">
          <div className="links-auth">
            <NavLink to={{
              pathname: "/"
            }}>
              <div className="navbar-logo" onClick={() => history.push('/')} />
            </NavLink>
          </div>
          <div className="searchbar" ref={searchResultsRef}>
            <SearchIcon id="searchbar-icon" htmlFor="searchbar" />
            <div className="searchbar-field">


              <input
                autoComplete='off'
                id="searchbar"
                type="text"
                placeholder='Search artworks'
                value={searchInput}
                onClick={() => setShowSearchResults(true)}
                onChange={(e) => {
                  searchItems(e.target.value);
                }}
              />

              {showSearchResults && (
                // <SearchResult onClose={() => setShowSearchResults(false)}>
                <div className="searchbar-results">
                  {filteredResults.slice(0, 10).map((result) => {
                    let searchResult;
                    if (result.price) {
                      searchResult = (
                        <NavLink to={`/artworks/${result._id}`}>
                          <div className="searchbar-result-name">
                            {result.name}
                          </div>
                        </NavLink>
                      );
                    } else {
                      searchResult = (
                        <NavLink to={`/users/${result._id}`}>
                          <div className="searchbar-result-name">
                            {result.email.split('@')[0]}
                          </div>
                        </NavLink>
                      );
                    }
                    return searchResult;
                  })}
                </div>
                // </SearchResult>
              )}

            </div>
          </div>
          <div className="nav-tools logout">
            <div><Link to={'/login'}><PersonIcon />Login</Link></div>
          </div>
        </div>);
    }
  }

  return (
    <>
      {getLinks()}

    </>
  );
}

export default NavBar;