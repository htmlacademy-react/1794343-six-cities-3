import { NameSpace } from '../../const';
import { State } from '../types';

export const getCurrentOffer = (state: State) => state[NameSpace.Offer].currentOffer;
export const getNearOffers = (state: State) => state[NameSpace.Offer].nearOffers;
export const getisOfferLoading = (state: State) => state[NameSpace.Offer].isOfferLoading;
export const getisNotFound = (state: State) => state[NameSpace.Offer].isNotFound;

