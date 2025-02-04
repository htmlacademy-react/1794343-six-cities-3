import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, requireAuthorization, setDataLoadingStatus, setEmail } from './actions';
import { AuthorizationStatus } from '../components/const';
import { OfferType } from '../components/offer-card/types';

type InitialState = {
  offers: OfferType[];
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
  email: string;
};

const initialState: InitialState = {
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  email: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.email = action.payload;
    });
});

export {reducer};
