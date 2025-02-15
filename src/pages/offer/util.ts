import { OfferType } from '../../helpers/types';

export const IMAGES_COUNT = 6;

export const REVIEWS_SHOWN_COUNT = 10;

export const ReviewRating = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly'
};

export const DateFormat = {
  REVIEW_DATE: 'MMMM YYYY'
};


const NEAR_OFFERS_COUNT = 3;

const getShownNearOffers = (offers: OfferType[], offer: OfferType) => {
  const nearOffers: OfferType[] = [];

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id !== offer.id) {
      nearOffers.push(offers[i]);
    }
    if (nearOffers.length >= NEAR_OFFERS_COUNT) {
      break;
    }
  }
  return nearOffers;
};

export {getShownNearOffers};
