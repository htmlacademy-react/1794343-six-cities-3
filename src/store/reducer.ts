import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  loadCurrentOffer,
  setCurrentOfferId,
  requireAuthorization,
  setDataLoadingStatus,
  setOfferLoadingStatus,
  setChangingFavoriteStatus,
  //setFavoritesLoadingStatus,
  setReviewSendingStatus,
  setNotFoundStatus,
  setEmail,
  loadNearOffers,
  loadReviews,
  addReview,
  loadFavoriteOffers,
  changeFavorite,
  setReviewSendingError
} from './actions';
import { AuthorizationStatus } from '../components/const';
import { OfferType } from '../components/offer-card/types';
import { ReviewType } from '../pages/offer/types';
import { FavoritesStatus } from '../components/favorite-button/const';

type InitialState = {
  offers: OfferType[];
  currentOffer: OfferType | null;
  currentOfferId: string;
  nearOffers: OfferType[];
  favoriteOffers: OfferType[];
  reviews: ReviewType[];
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
  isOfferLoading: boolean;
  //isFavoritesLoading: boolean;
  isFavoriteChanging: boolean;
  isReviewSending: boolean;
  isReviewSendingError: boolean;
  isNotFound: boolean;
  email: string;
};

const initialState: InitialState = {
  offers: [],
  currentOffer: null,
  currentOfferId: '',
  nearOffers: [],
  favoriteOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  isOfferLoading: true,
  isFavoriteChanging: false,
  //isFavoritesLoading: true,
  isReviewSending: false,
  isReviewSendingError: false,
  isNotFound: false,
  email: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(changeFavorite, (state, action) => {
      const {offer, status} = action.payload;
      if (status === FavoritesStatus.ADDED) {
        state.favoriteOffers.push(offer);
      } else {
        state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) =>
          favoriteOffer.id !== offer.id);
      }
    })
    .addCase(setCurrentOfferId, (state, action) => {
      state.currentOfferId = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    /*.addCase(setFavoritesLoadingStatus, (state, action) => {
      state.isFavoritesLoading = action.payload;
    })*/
    .addCase(setReviewSendingStatus, (state, action) => {
      state.isReviewSending = action.payload;
    })
    .addCase(setReviewSendingError, (state, action) => {
      state.isReviewSendingError = action.payload;
    })
    .addCase(setChangingFavoriteStatus, (state, action) => {
      state.isFavoriteChanging = action.payload;
    })
    .addCase(setNotFoundStatus, (state, action) => {
      state.isNotFound = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.email = action.payload;
    });
});

export {reducer};
