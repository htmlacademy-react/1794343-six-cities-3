import {Helmet} from 'react-helmet-async';
import OffersList from '../../components/offers-list';
import FavoritesEmpty from './favorites-empty';
import cn from 'classnames';
import { filterOffersByCity } from '../main/util';
import { cities } from '../../helpers/const';
import { useAppSelector } from '../../hooks/use-store';
import { getFavortiteOffers } from '../../store/favorites-process/selectors';
import LocationsItem from '../../components/locations-item';

function Favorites(): JSX.Element {
  const offers = useAppSelector(getFavortiteOffers);
  const isEmpty = offers.length === 0;

  return (
    <>
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <main className={cn(
        'page__main page__main--favorites',
        {'page__main--favorites-empty': isEmpty}
      )}
      >
        <div className="page__favorites-container container">
          {isEmpty
            ? <FavoritesEmpty />
            : (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {cities.map((city) => {
                    const filteredOffers = filterOffersByCity(offers, city);
                    if (filteredOffers.length === 0) {
                      return null;
                    }
                    return (
                      <li
                        className="favorites__locations-items"
                        key = {city}
                      >
                        <div className="favorites__locations locations locations--current">
                          <LocationsItem
                            city={city}
                          />
                        </div>
                        <div className="favorites__places">
                          <OffersList offers={filteredOffers}/>
                        </div>
                      </li>);
                  }
                  )}
                </ul>
              </section>)}
        </div>
      </main>
    </>
  );
}

export default Favorites;
