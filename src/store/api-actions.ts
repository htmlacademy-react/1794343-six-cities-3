import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  State,
  AppDispatch,
  UserData,
  AuthData,
  ReviewData,
  ChangeFavoriteData } from './types';
import {
  loadCurrentOffer,
  loadOffers,
  loadNearOffers,
  requireAuthorization,
  setDataLoadingStatus,
  setOfferLoadingStatus,
  //setFavoritesLoadingStatus,
  setNotFoundStatus,
  setChangingFavoriteStatus,
  setReviewSendingStatus,
  setReviewSendingError,
  setEmail,
  loadReviews,
  addReview,
  loadFavoriteOffers,
  changeFavorite
} from './actions';
import { APIRoute, AuthorizationStatus } from '../components/const';
import { OfferType } from '../components/offer-card/types';
import { saveToken, dropToken } from '../services/token';
import { ReviewType } from '../pages/offer/types';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {email}} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setEmail(email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setEmail(email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const addReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addReview',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    try {
      dispatch(setReviewSendingError(false));
      dispatch(setReviewSendingStatus(true));
      const {data} = await api.post<ReviewType>(`${APIRoute.Reviews}/${id}`, {comment, rating});
      dispatch(addReview(data));
      dispatch(setReviewSendingStatus(false));
    } catch {
      dispatch(setReviewSendingError(true));
    } finally {
      dispatch(setReviewSendingStatus(false));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setEmail(''));
      dispatch(loadFavoriteOffers([]));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadCurrentOffer',
  async (currentOfferId, { dispatch, extra: api}) => {
    try {
      dispatch(setNotFoundStatus(false));
      dispatch(setOfferLoadingStatus(true));
      const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${currentOfferId}`);
      dispatch(loadCurrentOffer(data));
      dispatch(setOfferLoadingStatus(false));
    } catch {
      dispatch(setNotFoundStatus(true));
    }
  },
);

export const fetchNearOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadNearOffers',
  async (currentOfferId, { dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${currentOfferId}/nearby`);
    dispatch(loadNearOffers(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadReviews',
  async (currentOfferId, { dispatch, extra: api}) => {
    const {data} = await api.get<ReviewType[]>(`${APIRoute.Reviews}/${currentOfferId}`);
    dispatch(loadReviews(data));
  },
);


export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadFavoriteOffers',
  async (_arg, { dispatch, extra: api}) => {
    //dispatch(setFavoritesLoadingStatus(true));
    const {data} = await api.get<OfferType[]>(APIRoute.Favorite);
    dispatch(loadFavoriteOffers(data));
    //dispatch(setFavoritesLoadingStatus(false));
  },
);

export const fetchChangeFavorite = createAsyncThunk<void, ChangeFavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'changeFavorite',
  async ({id, status}, { dispatch, extra: api}) => {
    try {
      dispatch(setChangingFavoriteStatus(true));
      const {data} = await api.post<OfferType>(`${APIRoute.Favorite}/${id}/${status}`);
      dispatch(changeFavorite({offer: data, status}));
    } finally {
      dispatch(setChangingFavoriteStatus(false));
    }
  },
);

