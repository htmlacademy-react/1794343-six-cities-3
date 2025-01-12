import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offersCount: number;
}

const Page = {
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
};

function App ({offersCount}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={getPage(offersCount, Page.Main)}
          />
          <Route
            path={AppRoute.Login}
            element={getPage(offersCount, Page.Login)}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <Favorites/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={getPage(offersCount, Page.Offer)}
          />
          <Route
            path="*"
            element={getPage(offersCount, Page.NotFound)}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export default App;
