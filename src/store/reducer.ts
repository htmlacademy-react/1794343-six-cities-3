import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, requireAuthorization, setDataLoadingStatus } from './action';
//import { offersData } from '../mocks/offers';
import { AuthorizationStatus } from '../components/const';
import { OfferType } from '../components/offer-card/types';

type InitialState = {
  offers: OfferType[];
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
};

const initialState: InitialState = {
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false
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
    });
});

export {reducer};
