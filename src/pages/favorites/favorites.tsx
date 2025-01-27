import {Helmet} from 'react-helmet-async';
import OffersList from '../../components/offers-list';
import FavoritesEmpty from './favorites-empty';
import { OfferType } from '../../components/offer-card/types';
import cn from 'classnames';

type FavoritesProps = {
  offers: OfferType[];
}

function Favorites({offers}: FavoritesProps): JSX.Element {
  const isEmpty = offers.length === 0;

  let mainContent;
  if (isEmpty) {
    mainContent = <FavoritesEmpty />;
  } else {
    mainContent = (
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              <OffersList offers={offers}/>
            </div>
          </li>

          <li className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Cologne</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              <OffersList offers={offers}/>
            </div>
          </li>
        </ul>
      </section>
    );
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
          {mainContent}
        </div>
      </main>
    </>
  );
}

export default Favorites;
