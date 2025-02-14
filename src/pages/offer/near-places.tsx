import { memo } from 'react';
import OffersList from '../../components/offers-list';
import { OfferType } from '../../helpers/types';

type NearPlacesProps = {
  offers: OfferType[];
}

const NearPlaces = memo(({offers}: NearPlacesProps): JSX.Element => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={offers}/>
      </div>
    </section>
  </div>));

NearPlaces.displayName = 'NearPlaces';

export default NearPlaces;
