import { memo } from 'react';
import { cities } from '../../helpers/const';
import { useSearchParams } from 'react-router-dom';
import LocationsItem from '../../components/locations-item';

const CitiesNav = memo((): JSX.Element => {
  const [searchParams] = useSearchParams();
  const currentCity = searchParams.get('city') || cities[0];

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <LocationsItem
              key={city}
              city={city}
              currentCity={currentCity}
            />
          ))}
        </ul>
      </section>
    </div>);
});

CitiesNav.displayName = 'CitiesNav';
export default CitiesNav;
