import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { GeolocationType } from "../context/ip-address-context";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type MapProps = {
  geolocation: GeolocationType;
};
const OffsetCenter = () => {
  const map = useMap();

  useEffect(() => {
    // Pan the map down by 100 pixels (i.e., move the center upward)
    map.panBy([0, -50], { animate: false });
  }, [map]);

  return null;
};

const Map = ({ geolocation }: MapProps) => {
  return (
    <MapContainer
      center={[geolocation.location.lat, geolocation.location.lng]}
      zoom={14}
      scrollWheelZoom={true}
      dragging={true}
      className='h-full z-50'
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={[geolocation.location.lat, geolocation.location.lng]}>
        <Popup>{`${geolocation.location.city}, ${geolocation.location.region}`}</Popup>
      </Marker>
      <OffsetCenter />
    </MapContainer>
  );
};

export default Map;
