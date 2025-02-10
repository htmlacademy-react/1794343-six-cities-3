import { FavoriteButtonPlace } from './const';

const getFavoriteButtonState = (place: FavoriteButtonPlace) => {

  let className = 'place-card';
  let width = 18;
  let height = 19;

  if (place === FavoriteButtonPlace.OfferPage) {
    className = 'offer';
    width = 31;
    height = 33;
  }

  return {className, width, height};
};

export {getFavoriteButtonState};
