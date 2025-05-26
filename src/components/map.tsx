import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { GeolocationType } from "../context/ip-address-context";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import navigatorIcon from "../assets/navigation.png";
import markerLocatorIcon from "../assets/icon-location.svg";
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const customMarker = new L.Icon({
  iconUrl: markerLocatorIcon,
  iconSize: [32, 38], // width, height
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // position of the popup relative to the icon
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
const RecenterButton = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  const recenterMap = () => {
    map.setView(center, map.getZoom(), {
      animate: true,
    });
  };

  return (
    <button
      onClick={recenterMap}
      className='absolute top-85 lg:top-4   right-4 z-[1000] bg-white px-3 py-3 shadow lg:cursor-pointer rounded-full hover:bg-gray-100'
    >
      <img className='lg:w-8 w-5' src={navigatorIcon} alt='navigator' />
    </button>
  );
};

const Map = ({ geolocation }: MapProps) => {
  return (
    <MapContainer
      center={[geolocation.location.lat, geolocation.location.lng]}
      zoom={14}
      zoomControl={false}
      scrollWheelZoom={true}
      dragging={true}
      className='h-full z-50'
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker
        position={[geolocation.location.lat, geolocation.location.lng]}
        icon={customMarker}
      >
        <Popup>{`${geolocation.location.city}, ${geolocation.location.region}`}</Popup>
      </Marker>
      <OffsetCenter />
      <RecenterButton
        center={[geolocation.location.lat, geolocation.location.lng]}
      />
    </MapContainer>
  );
};

export default Map;
