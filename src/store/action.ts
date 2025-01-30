import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../components/offer-card/types';

export const chooseCity = createAction('chooseCity', (city: string) => ({
  payload: city
}));

export const fillOffersList = createAction('fillOffersList', (offers: OfferType[]) => ({
  payload: offers
}));
