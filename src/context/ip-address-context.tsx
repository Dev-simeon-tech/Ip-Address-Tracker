import { createContext, useState } from "react";

type IPAddressProviderProps = {
  children: React.ReactNode;
};

export type GeolocationType = {
  ip: string;
  location: {
    city: string;
    region: string;
    postalCode: string;
    lat: number;
    lng: number;
    timezone: string;
  };
  isp: string;
};
export type IPAddressContextType = {
  ipAddress: string;
  setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  geolocation: GeolocationType | {};
  setGeolocation: React.Dispatch<React.SetStateAction<{} | GeolocationType>>;
};

export const IPAddressContext = createContext<IPAddressContextType>(
  {} as IPAddressContextType
);

export const IPAddressContextProvider = ({
  children,
}: IPAddressProviderProps) => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [geolocation, setGeolocation] = useState<GeolocationType | {}>({});
  const value = {
    ipAddress,
    setIpAddress,
    geolocation,
    setGeolocation,
  };
  return (
    <IPAddressContext.Provider value={value}>
      {children}
    </IPAddressContext.Provider>
  );
};
