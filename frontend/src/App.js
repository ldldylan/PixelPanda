import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Tweets from './components/Tweets/Tweets';
import Profile from './components/Profile/Profile';
import TweetCompose from './components/Tweets/TweetCompose';
import CreateArtworkPage from './components/Artwork/Create/CreateArtworkPage';
import Artwork from "./components/Artwork/Artwork.jsx";
import Cart from './components/Cart/Cart'
import { getCurrentUser } from './store/session';
import CreateReviewPage from './components/Review/Create/createReview';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
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
        <ProtectedRoute exact path="/artworks/:artworkId" component={Artwork}/>
        <ProtectedRoute exact path="/artworks/:artworkId/review" component={CreateReviewPage} />
        <ProtectedRoute exact path='/cart' component={Cart}  />
        <ProtectedRoute exact path="/tweets" component={Tweets} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/tweets/new" component={TweetCompose} />
      </Switch>
    </>
  );
}

export default App;