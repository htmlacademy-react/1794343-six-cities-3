import { createReducer } from '@reduxjs/toolkit';
import { chooseCity, fillOffersList } from './action';
import { cities } from '../pages/main/const';
import { offersData } from '../mocks/offers';

const initialState = {
  city: cities[0],
  offers: offersData
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
