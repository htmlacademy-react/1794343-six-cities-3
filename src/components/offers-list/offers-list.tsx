import OfferCard from '../offer-card';
import { OfferType } from '../offer-card/types';

type OfferListProps = {
  offers: OfferType[];
  handleMouseHover?: (offer?: OfferType) => void;
};

function OffersList({offers, handleMouseHover}: OfferListProps) {

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
