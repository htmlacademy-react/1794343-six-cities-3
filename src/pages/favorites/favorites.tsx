import {Helmet} from 'react-helmet-async';
import OffersList from '../../components/offers-list';
import { OfferType } from '../../components/offer-card/types';

type FavoritesProps = {
  offers: OfferType[];
}

function Favorites({offers}: FavoritesProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
        </div>
      </main>
    </>
  );
}

export default Favorites;
