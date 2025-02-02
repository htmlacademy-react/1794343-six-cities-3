import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from './types';
import { loadOffers, setDataLoadingStatus } from './action';
import { APIRoute } from '../components/const';
import { OfferType } from '../components/offer-card/types';

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
