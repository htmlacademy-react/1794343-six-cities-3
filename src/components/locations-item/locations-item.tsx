import { AppRoute } from '../../helpers/const';
import { Link, useLocation } from 'react-router-dom';
import { ElementType } from 'react';
import { getLocationsItemState } from './util';
import cn from 'classnames';

type LocationsItemProps = {
  city: string;
  currentCity?: string;
};
function LocationsItem({city, currentCity}: LocationsItemProps): JSX.Element {
  const {pathname} = useLocation();
  const {className, itemTagName} = getLocationsItemState(pathname as AppRoute);
  const Tag = itemTagName as ElementType;
  return (
    <Tag className="locations__item">
      <Link
        className={cn(
          'locations__item-link',
          [className],
          {'tabs__item--active': city === currentCity}
        )}
        to={`${AppRoute.Root}?city=${city}`}
      >
        <span>{city}</span>
      </Link>
    </Tag>
  );
}

export default LocationsItem;
