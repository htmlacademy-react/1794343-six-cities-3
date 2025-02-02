import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/offer-card/types';
import { AuthorizationStatus } from '../components/const';

export const loadOffers = createAction('loadOffers', (offers: OfferType[]) => ({
  payload: offers
}));

export const requireAuthorization = createAction('requireAuthorization', (authorizationStatus: AuthorizationStatus) => ({
  payload: authorizationStatus
}));

export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');
