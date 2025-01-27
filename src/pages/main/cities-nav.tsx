import cn from 'classnames';
import { cities } from './const';

type CitiesNavProps = {
  currentCity: string;
}

function CitiesNav({currentCity}: CitiesNavProps): JSX.Element {
  return (

    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={cn(
                  'locations__item-link tabs__item',
                  {'tabs__item--active': city === currentCity}
                )}
                href="#"
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>);
}

export default CitiesNav;
