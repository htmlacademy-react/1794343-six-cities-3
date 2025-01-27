import { useState } from 'react';
import { Nullable } from 'vitest';
import { OfferType } from '../../components/offer-card/types';
import OffersList from '../../components/offers-list';
import Map from '../../components/map.tsx';
import CitiesNav from './cities-nav.tsx';
import SortingForm from './sorting-form.tsx';
import { cities } from './const.ts';
import { filterOffersByCity } from './util.ts';
import { isPlural } from '../util.ts';
import MainEmpty from './main-empty.tsx';
import cn from 'classnames';

type MainProps = {
  offers: OfferType[];
}

function Main({offers}: MainProps): JSX.Element {
  const [activeOffer, setactiveOffer] = useState<Nullable<OfferType>>(null);
  const handleMouseHover = (offer?: OfferType) => {
    setactiveOffer (offer || null);
  };
  const currentCity = cities[3];
  const currentOffers = filterOffersByCity(offers, currentCity);
  const isEmpty = currentOffers.length === 0;

  let mainContent;
  if (isEmpty) {
    mainContent = <MainEmpty />;
  } else {
    mainContent = (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {`${currentOffers.length} place${isPlural(currentOffers.length) ? 's' : ''} to stay in ${currentCity}`}
          </b>
          <SortingForm />
          <div className="cities__places-list places__list tabs__content">
            <OffersList offers={currentOffers} handleMouseHover={handleMouseHover} />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offers={currentOffers} activeOffer={activeOffer} />
          </section>
        </div>
      </div>
    );
  }

  return (
    <main
      className={cn(
        'page__main page__main--index',
        {'page__main--index-empty': isEmpty}
      )}
    >
      <h1 className="visually-hidden">Cities</h1>
      <CitiesNav currentCity={currentCity}/>
      <div className="cities">
        {mainContent}
      </div>
    </main>
  );
}

export default Main;
