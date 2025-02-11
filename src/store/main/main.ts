import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferType } from '../../components/offer-card/types';
import { fetchOffersAction } from '../api-actions';

type InitialState = {
  offers: OfferType[];
  isDataLoading: boolean;
};

const initialState: InitialState = {
  offers: [],
  isDataLoading: false
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
      });
  }
});
