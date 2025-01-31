
import { cities } from './const';
import { NavLink, useSearchParams } from 'react-router-dom';


function CitiesNav(): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentCity = searchParams.get('city') || cities[0];

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <NavLink
                className={city === currentCity
                  ? 'locations__item-link tabs__item tabs__item--active'
                  : 'locations__item-link tabs__item'}
                to={`/?city=${city}`}
              >
                <span>{city}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>);
}

export default CitiesNav;
