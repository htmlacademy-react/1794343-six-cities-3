import OfferCard from '../offer-card';
import { OfferType } from '../offer-card/types';

type OfferListProps = {
  offers: OfferType[];
};

function OffersList({offers}: OfferListProps) {

  return (
    <>
      {offers.map((offer) => (
        <OfferCard key={offer.id}
          offer={offer}
        />
      ))}
    </>
  );
}

export default OffersList;
