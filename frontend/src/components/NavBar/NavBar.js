import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (<>
        <div>Hello World {user.email}</div>
        <button onClick={logoutUser}>Logout</button>
         <div className="links-nav">
           <Link to={'/tweets'}>All Tweets</Link>
           <Link to={'/profile'}>Profile</Link>
           <Link to={'/tweets/new'}>Write a Tweet</Link>
           <button onClick={logoutUser}>Logout</button>
         </div>
      </>);
    } else {
      return (
      <div className="navbar">
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/'}>Main</Link>
        </div>
        <div className="searchbar">
          <SearchIcon id="searchbar-icon" htmlFor="searchbar"/>
          <div className="searchbar-field">
            <input id="searchbar" type="text" placeholder='Search artwork or artists'></input>
          </div>
        </div>
        <div className="nav-tools">
          <div><FavoriteIcon/> Wish List </div>
          <div><ShoppingCart/> Cart </div>
          <div><PersonIcon/> Profile</div>
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