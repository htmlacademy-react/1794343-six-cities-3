import { memo } from 'react';
import OfferCard from '../offer-card';
import { OfferType } from '../offer-card/types';

type OfferListProps = {
  offers: OfferType[];
  handleMouseHover?: (offer?: OfferType) => void;
};

const OffersList = memo(({offers, handleMouseHover}: OfferListProps) => (
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
