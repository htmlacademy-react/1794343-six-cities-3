import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { OfferType } from '../../helpers/types';
import { fetchCurrentOfferAction, fetchNearOffersAction } from '../api-actions';

type InitialState = {
  currentOffer: OfferType | null;
  nearOffers: OfferType[];
  isOfferLoading: boolean;
  isNotFound: boolean;
};

const initialState: InitialState = {
  currentOffer: null,
  nearOffers: [],
  isOfferLoading: true,
  isNotFound: false,
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isNotFound = false;
        state.isOfferLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.isNotFound = false;
        state.isOfferLoading = false;
        state.currentOffer = action.payload;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.isNotFound = true;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });
  }
});
