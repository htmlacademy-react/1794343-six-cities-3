import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../helpers/const';
import Layout from '../layout';
import Main from '../../pages/main';
import Login from '../../pages/login';
import Favorites from '../../pages/favorites';
import Offer from '../../pages/offer';
import NotFound from '../../pages/not-found';
import Loading from '../../pages/loading';
import PrivateRoute from '../private-route';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { getisDataLoading, getisDataLoadingError } from '../../store/main-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { toast } from 'react-toastify';


function App (): JSX.Element {
  const isDataLoading = useAppSelector(getisDataLoading);
  const isDataLoadingError = useAppSelector(getisDataLoadingError);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [dispatch, authorizationStatus]);

  useEffect(() => {
    if (isDataLoadingError) {
      toast.error('Data loading Error. Please try refresh the Page.');
    }
  }, [isDataLoadingError]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <Loading />
    );
  }


  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
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
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={
                <Offer />
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
