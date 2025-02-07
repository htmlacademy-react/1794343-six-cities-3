import { OfferType } from '../../components/offer-card/types';
const IMAGES_COUNT = 6;

type GalleryProps = {
  offer: OfferType;
}

function GalleryPic({offer}: GalleryProps): JSX.Element {
  const {images} = offer;
  const shownImages = images.slice(0, IMAGES_COUNT);
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {shownImages.map((url) => (
          <div className="offer__image-wrapper" key={url}>
            <img className="offer__image" src={url} alt="Photo studio"/>
          </div>
        ))}
      </div>
    </div>);
}

export default GalleryPic;
