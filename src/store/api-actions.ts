import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  State,
  AppDispatch,
  UserData,
  AuthData,
  ReviewData,
  ChangeFavoriteData,
  ChangeFavoriteResponse,
  UserDataResponse} from './types';

import { APIRoute } from '../const';
import { OfferType } from '../components/offer-card/types';
import { saveToken, dropToken } from '../services/token';
import { ReviewType } from '../pages/offer/types';

export const checkAuthAction = createAsyncThunk<UserDataResponse, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data: {email, avatarUrl}} = await api.get<UserData>(APIRoute.Login);
    return ({email, avatarUrl});
  });

export const loginAction = createAsyncThunk<UserDataResponse, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data: {token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    return ({email, avatarUrl});
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'main/loadOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  },
);

export const addReviewAction = createAsyncThunk<ReviewType, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/addReview',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<ReviewType>(`${APIRoute.Reviews}/${id}`, {comment, rating});
    return data;
  },
);

export const fetchCurrentOfferAction = createAsyncThunk<OfferType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/loadCurrentOffer',
  async (currentOfferId, { extra: api}) => {
    const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${currentOfferId}`);
    return data;
  },
);

export const fetchNearOffersAction = createAsyncThunk<OfferType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/loadNearOffers',
  async (currentOfferId, { extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${currentOfferId}/nearby`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<ReviewType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/loadReviews',
  async (currentOfferId, { extra: api}) => {
    const {data} = await api.get<ReviewType[]>(`${APIRoute.Reviews}/${currentOfferId}`);
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/loadOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Favorite);
    return data;
  },
);

export const fetchChangeFavorite = createAsyncThunk<ChangeFavoriteResponse, ChangeFavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/changeFavorite',
  async ({id, status}, {extra: api}) => {
    const {data} = await api.post<OfferType>(`${APIRoute.Favorite}/${id}/${status}`);
    return({offer: data, status});
  },
);

