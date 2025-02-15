import { AppRoute } from '../../helpers/const';

const getOfferCardState = (pathname: AppRoute) => {
  let className = 'near-places';
  let classNameInfo = '';
  let width: number = 260;
  let height: number = 200;

  if (pathname === AppRoute.Root) {
    className = 'cities';
  } else if (pathname === AppRoute.Favorites) {
    width = 150;
    height = 110;
    className = 'favorites';
    classNameInfo = 'favorites__card-info ';
  }

  return {className, classNameInfo, width, height};
};

export {getOfferCardState};
