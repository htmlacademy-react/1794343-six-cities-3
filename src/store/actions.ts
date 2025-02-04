import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/offer-card/types';
import { AuthorizationStatus } from '../components/const';

export const loadOffers = createAction<OfferType[]>('loadOffers');

export const loadCurrentOffer = createAction<OfferType>('loadCurrentOffer');

export const setCurrentOfferId = createAction<string>('setCurrentOfferId');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');

export const setEmail = createAction<string>('setEmail');
