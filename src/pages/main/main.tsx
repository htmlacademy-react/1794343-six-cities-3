import CitiesNav from './cities-nav.tsx';
import { filterOffersByCity } from './util.ts';
import MainEmpty from './main-empty.tsx';
import MainContent from './main-content.tsx';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/use-store.ts';
import { cities } from './const.ts';
import { useSearchParams } from 'react-router-dom';

function Main(): JSX.Element {
  const [searchParams] = useSearchParams();
  const offers = useAppSelector((state) => state.offers);
  const currentCity = searchParams.get('city') || cities[0];
  const currentOffers = filterOffersByCity(offers, currentCity);
  const isEmpty = currentOffers.length === 0;

  return (
    <main
      className={cn(
        'page__main page__main--index',
        {'page__main--index-empty': isEmpty}
      )}
    >
      <h1 className="visually-hidden">Cities</h1>
      <CitiesNav />
      <div className="cities">
        {isEmpty
          ? <MainEmpty currentCity={currentCity} />
          : (
            <MainContent
              currentCity={currentCity}
              currentOffers={currentOffers}
            />)}
      </div>
    </main>
  );
}

export default Main;
