import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../helpers/const';
import { OfferType } from '../../helpers/types';
import { fetchOffersAction } from '../api-actions';

type InitialState = {
  offers: OfferType[];
  isDataLoading: boolean;
  isDataLoadingError: boolean;
};

const initialState: InitialState = {
  offers: [],
  isDataLoading: false,
  isDataLoadingError: false
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
        state.isDataLoadingError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
        state.isDataLoadingError = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isDataLoadingError = true;
      });
  }
});
