export enum FavoriteButtonPlace {
  PlaceCard = 'card',
  OfferPage = 'offer'
}

export enum FavoritesStatus {
  ADDED = 1,
  DELETED = 0
}


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
