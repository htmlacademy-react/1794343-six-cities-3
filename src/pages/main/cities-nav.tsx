import cn from 'classnames';
import { useAppDispatch } from '../../hooks/use-store';
import { chooseCity } from '../../store/action';
import { cities } from './const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../components/const';

type CitiesNavProps = {
  currentCity: string;
}

function CitiesNav({currentCity}: CitiesNavProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <Link
                className={cn(
                  'locations__item-link tabs__item',
                  {'tabs__item--active': city === currentCity}
                )}
                to={AppRoute.Root}
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(chooseCity(city));
                }}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>);
}

export default CitiesNav;
