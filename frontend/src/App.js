import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import CreateArtworkPage from './components/Artwork/Create/CreateArtworkPage';
import UpdateArtworkPage from './components/Artwork/Update/UpdateArtworkPage';
import Artwork from "./components/Artwork/Artwork.jsx";
import User from "./components/User/User";
import Cart from './components/Cart/ShoppingCart';
import { getCurrentUser } from './store/session';
import CreateReviewForm from './components/Review/Create/CreateReviewForm';
import Checkout from './components/Cart/Checkout' 
import AOS from "aos";
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentFail from './components/Payment/PaymentFail';
import About from './components/AboutPage/About';
import "aos/dist/aos.css";
import Wishlist from './components/Wishlist/Wishlist';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/artworks/create" component={CreateArtworkPage} />
        {/* <ProtectedRoute exact path="/artworks/update/" render={(props) => <UpdateArtworkPage {...props} />} /> */}
        <ProtectedRoute exact path="/artworks/:artworkId" component={Artwork}/>
        <ProtectedRoute exact path="/users/:userId" component={User}/>
        <ProtectedRoute exact path="/artworks/:artworkId/review/:reviewId?" component={CreateReviewForm} />
        <ProtectedRoute exact path="/checkout" component={Checkout}/>
        <ProtectedRoute exact path='/cart' component={Cart} />
        <ProtectedRoute exact path='/wishlist' component={Wishlist} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/about" component={About}/>
        <ProtectedRoute exact path='/success' component={PaymentSuccess} />
      </Switch>
    </>
  );
}

export default App;