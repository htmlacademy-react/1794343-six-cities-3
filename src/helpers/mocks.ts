import {name, internet, datatype, lorem, address} from 'faker';
import { ReviewType } from './types';
import { ReviewData, ChangeFavoriteData, ChangeFavoriteResponse } from '../store/types';
import { OfferType } from './types';

export const makeFakeReview = (): ReviewType => ({
  id: datatype.uuid(),
  date: new Date().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: internet.url(),
    isPro: datatype.boolean(),
  },
  comment: datatype.string(51),
  rating: datatype.number({ min: 1, max: 5}),
} as ReviewType);

export const makeFakeReviews = (count: number = 3): ReviewType[] =>
  Array.from({ length: count }, () => makeFakeReview());

export const makeFakeChangeFavoriteData = (): ChangeFavoriteData => ({
  id: datatype.uuid(),
  status: datatype.number({ min: 0, max: 1}),
} as ChangeFavoriteData);

export const makeFakeAddtoFavoriteData = (offer: OfferType): ChangeFavoriteResponse => ({
  offer,
  status: 1,
} as ChangeFavoriteResponse);

export const makeFakeDeletefromFavoriteData = (offer: OfferType): ChangeFavoriteResponse => ({
  offer,
  status: 0,
} as ChangeFavoriteResponse);

export const makeFakeReviewData = (): ReviewData => ({
  id: datatype.uuid(),
  comment: datatype.string(51),
  rating: datatype.number({ min: 1, max: 5}),
} as ReviewData);

export const makeFakeOffer = (): OfferType => ({
  id: datatype.uuid(),
  title: lorem.sentence(),
  type: lorem.word(),
  price: datatype.number({ min: 200, max: 5000}),
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number({ min: 13, max: 16}),
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number({ min: 13, max: 16}),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({ min: 1, max: 5}),
  previewImage: internet.url(),
  description: lorem.paragraph(),
  bedrooms: datatype.number({ min: 1, max: 5}),
  goods: [lorem.word(), lorem.word(), lorem.word()],
  host: {
    name: name.title(),
    avatarUrl: internet.url(),
    isPro: datatype.boolean(),
  },
  images: [internet.url(), internet.url()],
  maxAdults: datatype.number({ min: 1, max: 5})
} as OfferType);

export const makeFakeOffers = (count: number = 3): OfferType[] =>
  Array.from({ length: count }, () => makeFakeOffer());
