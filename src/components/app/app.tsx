import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute } from '../const';
import { getAuthorizationStatus } from '../../mock/authorization-status';
import Layout from '../layout';
import Main from '../../pages/main';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import Offer from '../../pages/offer';
import NotFound from '../../pages/not-found';
import PrivateRoute from '../private-route';

type AppProps = {
  offersCount: number;
}

/*const Page = {
  Main: 'main',
  Login: 'login',
  Favorites: 'favorites',
  Offer: 'offer',
  NotFound: 'not-found'
};

const getPage = (offersCount: number, currentPage: string) => {
  switch (currentPage) {
    case Page.Main:
      return <Main offersCount={offersCount}/>;
    case Page.Login:
      return <Login/>;
    case Page.Favorites:
      return <Favorites/>;
    case Page.Offer:
      return <Offer/>;
    case Page.NotFound:
      return <NotFound/>;
  }
};*/

function App ({offersCount}: AppProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout />}
          >
            <Route
              index
              element={<Main offersCount={offersCount} />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  isReverse
                >
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                >
                  <Favorites/>
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<Offer />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export default App;
