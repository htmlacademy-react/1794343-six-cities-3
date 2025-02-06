import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import OffersList from '../../components/offers-list';
import FavoritesEmpty from './favorites-empty';
import cn from 'classnames';
import { filterOffersByCity } from '../main/util';
import { cities } from '../main/const';
import { AppRoute } from '../../components/const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import Loading from '../loadig';


function Favorites(): JSX.Element {
  const offers = useAppSelector((state) => state.favoriteOffers);
  const isEmpty = offers.length === 0;
  const isFavoritesLoading = useAppSelector((state) => state.isFavoritesLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if (isFavoritesLoading) {
    return <Loading />;
  }

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
                          <div className="locations__item">
                            <Link
                              className="locations__item-link"
                              to={`${AppRoute.Root}?city=${city}`}
                            >
                              <span>{city}</span>
                            </Link>
                          </div>
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
