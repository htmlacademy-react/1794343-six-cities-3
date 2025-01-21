import { useState } from 'react';
import OfferCard from '../offer-card';
import { OfferType } from '../offer-card/types';
import { Nullable } from 'vitest';

type OfferListProps = {
  offers: OfferType[];
};

function OffersList({offers}: OfferListProps) {
  const [activeOffer, setactiveOffer] = useState<Nullable<OfferType>>(null);
  const handleMouseHover = (offer?: OfferType) => {
    setactiveOffer (offer || null);
  };

  return (
    <>
      {offers.map((offer) => (
        <OfferCard key={offer.id}
          offer={offer}
          handleMouseHover={handleMouseHover}
        />
      ))}
    </>
  );
}

export default OffersList;
