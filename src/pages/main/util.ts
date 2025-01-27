import { OfferType } from '../../components/offer-card/types';

export function filterOffersByCity(offers: OfferType[], city: string) {
  return offers.filter((offer) => offer.city.name === city);
}
