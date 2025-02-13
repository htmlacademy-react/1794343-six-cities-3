import { memo } from 'react';
import {useRef, useEffect} from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { OfferType } from '../offer-card/types';
import { IconSetting } from './const';

type MapProps = {
  offers: OfferType[];
  activeOffer: OfferType | null | undefined;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: IconSetting.URL_DEFAULT_ICON,
  iconSize: [IconSetting.ICON_WIDTH, IconSetting.ICON_HEIGHT],
  iconAnchor: [IconSetting.ICON_ANCHOR, IconSetting.ICON_HEIGHT]
});

const currentCustomIcon = leaflet.icon({
  iconUrl: IconSetting.URL_CURRENT_ICON,
  iconSize: [IconSetting.ICON_WIDTH, IconSetting.ICON_HEIGHT],
  iconAnchor: [IconSetting.ICON_ANCHOR, IconSetting.ICON_HEIGHT]
});

const Map = memo(({offers, activeOffer}: MapProps): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, offers[0]);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      const city = offers[0].city.location;
      map.setView([city.latitude, city.longitude], city.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [map, offers]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOffer?.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerLayer.current);
      });
      const currentMarkerLayer = markerLayer.current;
      return () => {
        currentMarkerLayer.clearLayers();
      };
    }
  }, [map, offers, activeOffer]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
});

Map.displayName = 'Map';

export default Map;
