// hooks/usePublicIP.ts
import { useQuery } from "@tanstack/react-query";

const fetchPublicIP = async (): Promise<string> => {
  const res = await fetch("https://api.ipify.org?format=json");
  const data = await res.json();
  return data.ip;
};

export const usePublicIP = () =>
  useQuery({
    queryKey: ["publicIP"],
    queryFn: fetchPublicIP,
    staleTime: Infinity,
    retry: false,
  });
