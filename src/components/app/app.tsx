import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute } from '../const';
import { getAuthorizationStatus } from '../../mocks/authorization-status';
import Layout from '../layout';
import Main from '../../pages/main';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import Offer from '../../pages/offer';
import NotFound from '../../pages/not-found';
import PrivateRoute from '../private-route';
import { OfferType } from '../offer-card/types';
import { ReviewType } from '../../pages/offer/types';

type AppProps = {
  offers: OfferType[];
  reviews: ReviewType[];
}

function App ({offers, reviews}: AppProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout offers={offers} />}>
            <Route
              element={<Main/>}
              path={AppRoute.Root}
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
                  <Favorites offers={offers}/>
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={
                <Offer
                  offers={offers}
                  reviews={reviews}
                />
              }
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
