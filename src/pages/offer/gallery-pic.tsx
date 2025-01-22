import { OfferType } from '../../components/offer-card/types';

type GalleryProps = {
  offer: OfferType;
}

function GalleryPic({offer}: GalleryProps): JSX.Element {
  const {images} = offer;
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((url) => (
          <div className="offer__image-wrapper" key={url}>
            <img className="offer__image" src={url} alt="Photo studio"/>
          </div>
        ))}
      </div>
    </div>);
}

export default GalleryPic;
