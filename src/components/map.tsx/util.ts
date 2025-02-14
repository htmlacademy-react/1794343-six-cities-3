import { AppRoute } from '../../helpers/const';

export const IconSetting = {
  URL_DEFAULT_ICON: 'img/pin.svg',
  URL_CURRENT_ICON: 'img/pin-active.svg',
  ICON_ANCHOR: 14,
  ICON_WIDTH: 27,
  ICON_HEIGHT: 39
} as const;

export const getMapState = (pathname: AppRoute) => {
  let className = 'offer';
  if (pathname === AppRoute.Root) {
    className = 'cities';
  }
  return {className};
};
