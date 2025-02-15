import { AppRoute } from '../../helpers/const';
import { ElementType } from 'react';

const getLocationsItemState = (pathname: AppRoute) => {

  let className = '';
  let itemTagName: ElementType = 'div';

  if (pathname === AppRoute.Root) {
    className = 'tabs__item';
    itemTagName = 'li';
  }
  return {className, itemTagName};
};

export {getLocationsItemState};
