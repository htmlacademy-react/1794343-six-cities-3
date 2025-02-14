import { useState, useCallback, useMemo } from 'react';
import { OfferType } from '../../helpers/types.ts';
import OffersList from '../../components/offers-list';
import Map from '../../components/map.tsx';
import SortingForm from './sorting-form.tsx';
import { isPlural } from '../helpers.ts';
import { SortingOption } from './util.ts';
import { getSortingOffers } from './util.ts';

type MainContentProps = {
  currentCity: string;
  currentOffers: OfferType[];
}

function MainContent({currentOffers, currentCity}: MainContentProps): JSX.Element {

  const [activeOffer, setactiveOffer] = useState<OfferType | null | undefined>(null);
  const handleMouseHover = useCallback((offer?: OfferType) => {
    setactiveOffer (offer || null);
  }, []);

  const [currentOption, setCurrentOption] = useState(SortingOption.POPULAR);
  const handleOptionChange = useCallback((option: SortingOption) => {
    setCurrentOption(option);
  }, []);

  const sortedOffers = useMemo(() => getSortingOffers(currentOption, currentOffers), [currentOption, currentOffers]);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {`${currentOffers.length} place${isPlural(currentOffers.length) ? 's' : ''} to stay in ${currentCity}`}
        </b>
        <SortingForm
          currentOption={currentOption}
          onOptionChange={handleOptionChange}
        />
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            offers={sortedOffers}
            handleMouseHover={handleMouseHover}
          />
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          offers={currentOffers}
          activeOffer={activeOffer}
        />
      </div>
    </div>);
}

export default MainContent;
