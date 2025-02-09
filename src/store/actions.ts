import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/offer-card/types';
import { AuthorizationStatus } from '../components/const';
import { ReviewType } from '../pages/offer/types';
import { ChangeFavoriteResponse } from './types';

export const loadOffers = createAction<OfferType[]>('loadOffers');

export const loadCurrentOffer = createAction<OfferType>('loadCurrentOffer');

export const loadNearOffers = createAction<OfferType[]>('loadNearOffers');

export const loadReviews = createAction<ReviewType[]>('loadReviews');

export const addReview = createAction<ReviewType>('addReview');

export const loadFavoriteOffers = createAction<OfferType[]>('loadFavoriteOffers');

export const changeFavorite = createAction<ChangeFavoriteResponse>('changeFavorite');

export const setChangingFavoriteStatus = createAction<boolean>('setChangingFavoriteStatus');

export const setCurrentOfferId = createAction<string>('setCurrentOfferId');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');

export const setOfferLoadingStatus = createAction<boolean>('setOfferLoadingStatus');

//export const setFavoritesLoadingStatus = createAction<boolean>('setFavoritesLoadingStatus');

export const setReviewSendingStatus = createAction<boolean>('setReviewSendingStatus');

export const setReviewSendingError = createAction<boolean>('setReviewSendingError');

export const setNotFoundStatus = createAction<boolean>('setNotFoundStatus');

export const setEmail = createAction<string>('setEmail');
