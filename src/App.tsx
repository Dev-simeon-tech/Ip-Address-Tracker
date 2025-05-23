import { useContext, useEffect } from "react";
import { IPAddressContext } from "./context/ip-address-context";
import { useQuery } from "@tanstack/react-query";
import { usePublicIP } from "./hooks/usePublicIP";

import fetchGeolocation from "./utils/fetch-geoloation.utils";
import IpAddressForm from "./components/ipAddressForm";
import Map from "./components/map";
import IpInfo from "./components/ip-info";
import { CircularProgress } from "@mui/material";

const App = () => {
  const { ipAddress, setIpAddress } = useContext(IPAddressContext);
  const { data: userIp } = usePublicIP();

  const {
    data: geolocation,
    refetch,
    status,
  } = useQuery({
    queryKey: ["ipAddress", ipAddress],
    queryFn: () => fetchGeolocation(ipAddress!),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (userIp) {
      setIpAddress(userIp);
    }
  }, [userIp]);

  useEffect(() => {
    if (ipAddress) {
      refetch();
    }
  }, [ipAddress]);

  return (
    <>
      <div className='address-header px-4 pt-4 flex  flex-col h-[15rem] text-center'>
        <h1 className='text-white text-3xl font-medium'>IP Address Tracker</h1>
        <IpAddressForm />
      </div>
      {geolocation && <IpInfo geolocation={geolocation} />}
      <div className='flex-2'>
        {status !== "pending" && geolocation ? (
          <Map geolocation={geolocation} />
        ) : (
          <div className='h-full flex items-center justify-center'>
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
