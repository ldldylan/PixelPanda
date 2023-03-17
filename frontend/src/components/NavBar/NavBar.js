import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './NavBar.css';
import { logout } from '../../store/session';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import BrushIcon from '@mui/icons-material/Brush';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const directToCart = e => {
    e.preventDefault();
    history.push('/cart')
  }

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
            <input id="searchbar" type="text" placeholder='Search artwork or artists'></input>
          </div>
        </div>
        <div className="nav-tools">
          <div><BrushIcon/> Create</div>
          <div><PersonIcon/> Profile</div>
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
            <input id="searchbar" type="text" placeholder='Search artwork or artists'></input>
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