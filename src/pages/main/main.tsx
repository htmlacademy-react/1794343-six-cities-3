import { useState } from 'react';
import { Nullable } from 'vitest';
import { OfferType } from '../../components/offer-card/types';
import OffersList from '../../components/offers-list';
import Map from '../../components/map.tsx';

type MainProps = {
  offersCount: number;
  offers: OfferType[];
}

const cities = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

//не забыть передать в мэп оферы выбранного города после реализации фильтра по городам

function Main({offersCount, offers}: MainProps): JSX.Element {
  const [activeOffer, setactiveOffer] = useState<Nullable<OfferType>>(null);
  const handleMouseHover = (offer?: OfferType) => {
    setactiveOffer (offer || null);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <li className="locations__item" key={city}>
                <a className={`locations__item-link tabs__item ${city === 'Paris' ? 'tabs__item--active' : ''}`} href="#">
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offers={offers}
                handleMouseHover={handleMouseHover}
              />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map
                offers={offers}
                activeOffer={activeOffer}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
