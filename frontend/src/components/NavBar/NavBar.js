import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

function NavBar () {
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user);
  const artworks = useSelector(state => Object.values(state.artworks));
  
  const [showCreateArtworkModal, setShowCreateArtworkModal] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const searchResultsPortal = document.createElement("div");

  const searchItems = (searchValue) => {
    console.log('searching for: ', searchValue,'...');
    setSearchInput(searchValue);
    
    if (searchValue !== '') {
      console.log(artworks);
      const filteredArtworks = artworks.filter((artwork) => {
        return artwork.name.toLowerCase().includes(searchValue.toLowerCase());
      });
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

  useEffect(() => {
    document.body.appendChild(searchResultsPortal);

    // remove the portal element from the document body when the component unmounts
    return () => {
      document.body.removeChild(searchResultsPortal);
    };
  }, [searchResultsPortal]);

  const getLinks = () => {
    if (loggedIn) {
      return (<>
      <div className="navbar">
          <div className="links-nav">
            <NavLink to={{
                  pathname: "/"
                }}>
            <div className="navbar-logo" onClick={()=>history.push('/')}/>
            </NavLink> 
          </div>
          <div className="searchbar">
          <SearchIcon id="searchbar-icon" htmlFor="searchbar"/>
          <div className="searchbar-field">
            

            <input 
            autoComplete='off'
            id="searchbar" 
            type="text"  
            placeholder='Search artworks'
            value={searchInput}
            onChange={(e) => {
              setShowSearchResults(true);
              searchItems(e.target.value);
            }}
          />

           {showSearchResults && (
            // <SearchResult onClose={() => setShowSearchResults(false)}>
              <div className="searchbar-results">
                {filteredResults.slice(0,10).map((artwork) => {
                  return (
                      <div className="searchbar-result-name">
                        <NavLink to={`/artworks/${artwork._id}`}>
                          {artwork.name}
                        </NavLink>
                      </div>
                  )
                }
                )}
              </div>
            // </SearchResult>
           )}

          </div>
        </div>
        <div className="nav-tools">
              <div
               onClick={
                ()=>  setShowCreateArtworkModal(true)
               } ><BrushIcon/>Create</div>{showCreateArtworkModal && (
                <Modal onClose={() => setShowCreateArtworkModal(false)}
                className="create-server">
                  <CreateArtworkPage onClose={() => setShowCreateArtworkModal(false)} 
                  />
                </Modal>
              )}
          
          <div onClick={()=>history.push(`/users/${user._id}`)}><PersonIcon/> Profile</div>
          <div onClick={directToCart}><ShoppingCart/> Cart </div>
          <div ><FavoriteIcon/> Wish List </div>
          
          
          <div onClick={logoutUser}><LogoutIcon/> Logout</div>
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
           <div className="navbar-logo" onClick={()=>history.push('/')}/>
           </NavLink> 
         </div>
         <div className="searchbar">
          <SearchIcon id="searchbar-icon" htmlFor="searchbar"/>
          <div className="searchbar-field">
            

            <input 
            autoComplete='off'
            id="searchbar" 
            type="text"  
            placeholder='Search artworks'
            value={searchInput}
            onChange={(e) => {
              setShowSearchResults(true);
              searchItems(e.target.value);
            }}
          />

           {showSearchResults && (
            // <SearchResult onClose={() => setShowSearchResults(false)}>
              <div className="searchbar-results">
                {filteredResults.slice(0,10).map((artwork) => {
                  return (
                      <div className="searchbar-result-name">
                        <NavLink to={`/artworks/${artwork._id}`}>
                          {artwork.name}
                        </NavLink>
                      </div>
                  )
                }
                )}
              </div>
            // </SearchResult>
           )}

          </div>
        </div>
        <div className="nav-tools logout">
          <div><Link to={'/login'}><PersonIcon/>Login</Link></div>
        </div>
      </div>);
    }
  }

  return (
    <>
      { getLinks() }
      
    </>
  );
}

export default NavBar;