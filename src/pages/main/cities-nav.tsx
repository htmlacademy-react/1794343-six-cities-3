import { useAppDispatch } from '../../hooks/use-store';
import { chooseCity } from '../../store/action';
import { cities } from './const';
import { NavLink } from 'react-router-dom';


function CitiesNav(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <NavLink
                className={({ isActive }) => (
                  isActive
                    ? 'locations__item-link tabs__item tabs__item--active'
                    : 'locations__item-link tabs__item')}
                onClick={() => {
                  dispatch(chooseCity(city));
                }}
                to={`/${city}`}
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
