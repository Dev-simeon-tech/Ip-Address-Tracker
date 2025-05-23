import type { GeolocationType } from "../context/ip-address-context";

const IpInfo = ({ geolocation }: { geolocation: GeolocationType }) => {
  const { ip, location, isp } = geolocation || {};
  console.log(geolocation);
  return (
    <div className='absolute top-40 z-100  left-1/2 shadow-2xl -translate-x-1/2 rounded-2xl w-[90%] lg:w-[75%] bg-white lg:px-0 lg:py-8 p-4'>
      <ul className='flex flex-col ip-info-list lg:flex-row lg:justify-center lg:divide-x-2 lg:divide-Dark-Gray lg:gap-0 lg:text-left gap-4 text-center'>
        <li>
          <h2>IP Address</h2>
          <p>{ip}</p>
        </li>
        <li>
          <h2>Location</h2>
          <p>{`${location?.city}, ${location?.region} ${
            location?.postalCode ? location?.postalCode : ""
          }`}</p>
        </li>
        <li>
          <h2>Timezone</h2>
          <p>UTC{location?.timezone}</p>
        </li>
        <li>
          <h2>ISP</h2>
          <p>{isp}</p>
        </li>
      </ul>
    </div>
  );
};

export default IpInfo;
