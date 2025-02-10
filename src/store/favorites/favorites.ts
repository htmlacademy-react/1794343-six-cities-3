import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferType } from '../../components/offer-card/types';
import { fetchFavoriteOffersAction, fetchChangeFavorite } from '../api-actions';
import { FavoritesStatus } from '../../components/favorite-button/const';
import { logoutAction } from '../api-actions';

type InitialState = {
  favoriteOffers: OfferType[];
  isFavoriteChanging: boolean;
};

const initialState: InitialState = {
  favoriteOffers: [],
  isFavoriteChanging: false
};

export const favoritesProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchChangeFavorite.pending, (state) => {
        state.isFavoriteChanging = true;
      })
      .addCase(fetchChangeFavorite.fulfilled, (state, action) => {
        const {offer, status} = action.payload;
        if (status === FavoritesStatus.ADDED) {
          state.favoriteOffers.push(offer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) =>
            favoriteOffer.id !== offer.id);
        }
        state.isFavoriteChanging = false;
      })
      .addCase(fetchChangeFavorite.rejected, (state) => {
        state.isFavoriteChanging = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteOffers = [];
      });
  }
});
