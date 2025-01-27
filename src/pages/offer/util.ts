import { OfferType } from '../../components/offer-card/types';
const NEAR_OFFERS_COUNT = 3;
//когда предложения поблизости будут приходить с сервера, проверку на совпадение города убрать
const getNearOffers = (offers: OfferType[], offer: OfferType) => {
  const nearOffers: OfferType[] = [];

  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id !== offer.id && offers[i].city.name === offer.city.name) {
      nearOffers.push(offers[i]);
    }
    if (nearOffers.length >= NEAR_OFFERS_COUNT) {
      break;
    }
  }
  return nearOffers;
};

export {getNearOffers};
