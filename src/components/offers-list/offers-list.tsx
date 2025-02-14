import { memo } from 'react';
import OfferCard from '../offer-card';
import { OfferType } from '../../helpers/types';

type OffersListProps = {
  offers: OfferType[];
  handleMouseHover?: (offer?: OfferType) => void;
};

const OffersList = memo(({offers, handleMouseHover}: OffersListProps) => (
  <>
    {offers.map((offer) => (
      <OfferCard key={offer.id}
        offer={offer}
        handleMouseHover={handleMouseHover}
      />
    ))}
  </>
));

OffersList.displayName = 'OffersList';

export default OffersList;
