import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route path={path} exact={exact} render={(props) => (
      // !loggedIn ? (
        <Component {...props} />
      // ) : (
        // <Redirect to="/artworks/1" />
      // )
    )} />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => !!state.session.user);

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};